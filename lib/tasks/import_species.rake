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
    ActiveRecord::Base.connection.execute "CREATE TABLE #{TMP_TABLE} ( Kingdom varchar, PhyName varchar, ClaName varchar, OrdName varchar, FamName varchar, GenName varchar, SpcName varchar, SpcInfra varchar, SpcRecId integer, SpcStatus varchar)"
    puts "Table created"
    puts "Copying data from #{ENV["FILE"]} into tmp table"
    sql = <<-SQL
      COPY #{TMP_TABLE} ( Kingdom, PhyName, ClaName, OrdName, FamName, GenName, SpcName, SpcInfra, SpcRecId, SpcStatus)
      FROM '#{Rails.root + ENV["FILE"]}'
      WITH DElIMITER ','
      CSV HEADER;
    SQL
    ActiveRecord::Base.connection.execute(sql)
    puts "Data copied to tmp table"
    puts "Importing Kingdoms"
    rank_id = Rank.select(:id).where(:name => 'Kingdom').first.id
    existing = Taxon.where(:rank_id => rank_id).count
    puts "There were #{existing} Kingdoms before we started"
    sql = <<-SQL
      INSERT INTO taxons(scientific_name, rank_id)
      SELECT DISTINCT Kingdom, #{rank_id}
      FROM #{TMP_TABLE}
      WHERE NOT EXISTS (
        SELECT scientific_name, rank_id
        FROM taxons
        WHERE scientific_name like Kingdom AND rank_id = #{rank_id}
      )
    SQL
    puts "#{Taxon.where(:rank_id => rank_id).count - existing} Kingdoms added"
  end
end
