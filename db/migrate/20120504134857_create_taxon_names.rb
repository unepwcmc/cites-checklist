class CreateTaxonNames < ActiveRecord::Migration
  def change
    create_table :taxon_names do |t|
      t.string :scientific_name, :null => false
      t.integer :basionym_id

      t.timestamps
    end
    add_foreign_key :taxon_names, :taxon_names, :column => :basionym_id
  end
end
