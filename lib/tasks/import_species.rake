namespace :import do
  desc "Import species records from csv file [usage: FILE=[path/to/file] rake import:species"
  task :species => :environment do
    if !ENV["FILE"] || !File.file?(ENV["FILE"]) #if the file is not defined, explain and leave.
      puts "Please specify a valid csv file from which to import species data"
      puts "Usage: FILE=[path/to/file] rake import:species"
      next
    end

    TMP_TABLE = 'species_import'
    puts "Remove tmp table before starting the import"
    begin
      ActiveRecord::Base.connection.execute "DROP TABLE species_import;"
      puts "Table removed"
    rescue Exception => e
      puts "Could not drop table species_import. It might not exist if this is the first time you are running this rake task.. carry on"
    end
    puts "Creating tmp table"
    ActiveRecord::Base.connection.execute "CREATE TABLE #{TMP_TABLE} ( Kingdom varchar, Phylum varchar, Class varchar, TaxonOrder varchar, Family varchar, Genus varchar, Species varchar, SpcInfra varchar, SpcRecId integer, SpcStatus varchar)"
    puts "Table created"
    puts "Copying data from #{ENV["FILE"]} into tmp table"
    sql = <<-SQL
      COPY #{TMP_TABLE} ( Kingdom, Phylum, Class, TaxonOrder, Family, Genus, Species, SpcInfra, SpcRecId, SpcStatus)
      FROM '#{Rails.root + ENV["FILE"]}'
      WITH DElIMITER ','
      CSV HEADER;
    SQL
    ActiveRecord::Base.connection.execute(sql)
    puts "Data copied to tmp table"
    import_data_for 'Kingdom'
    import_data_for 'Phylum', 'Kingdom'
    import_data_for 'Class', 'Phylum'
    import_data_for 'Order', 'Class', 'TaxonOrder'
    import_data_for 'Family', 'TaxonOrder'
    import_data_for 'Genus', 'Family'
    import_data_for 'Species', 'Genus'
  end
end

# Copies data from the temporary table to the correct tables in the database
#
# @param [String] which the column to be copied. It's normally the name of the rank being copied
# @param [String] parent_column to keep the hierarchy of the taxons the parent column should be passed
# @param [String] column_name if the which object is different from the column name in the tmp table, specify the column name
def import_data_for which, parent_column=nil, column_name=nil
  column_name ||= which
  puts "Importing #{which}"
  rank_id = Rank.select(:id).where(:name => which).first.id
  existing = Taxon.where(:rank_id => rank_id).count
  puts "There were #{existing} #{which} before we started"
  if parent_column
    sql = <<-SQL
      INSERT INTO taxa(scientific_name, rank_id, parent_id, created_at, updated_at)
         SELECT
           tmp.#{column_name}
           ,#{rank_id}
           ,taxa.id
           ,current_date
           ,current_date
         FROM
          (
            SELECT DISTINCT species_import.#{column_name}, species_import.#{parent_column}
            FROM species_import
            WHERE NOT EXISTS (
              SELECT scientific_name, rank_id
              FROM taxa
              WHERE taxa.scientific_name like species_import.#{column_name} and taxa.rank_id = #{rank_id} )
          ) as tmp
          JOIN taxa ON taxa.scientific_name LIKE tmp.#{parent_column}
      RETURNING id;
    SQL
  else
    sql = <<-SQL
      INSERT INTO taxa(scientific_name, rank_id, created_at, updated_at)
        SELECT DISTINCT #{column_name}, #{rank_id}, current_date, current_date
        FROM #{TMP_TABLE}
        WHERE NOT EXISTS (
          SELECT scientific_name, rank_id
          FROM taxa
          WHERE scientific_name like #{which} AND rank_id = #{rank_id}
        )
      RETURNING id;
    SQL
  end
  result = ActiveRecord::Base.connection.execute(sql)
  cites = Institution.find_by_name('CITES')
  result.map{|h| h.values}.flatten.each { |id|
    if id
      Taxon.find(id).institutions << cites
    end
  }
  puts "#{Taxon.where(:rank_id => rank_id).count - existing} #{which} added"
end
