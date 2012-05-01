class CreateTaxonRelationships < ActiveRecord::Migration
  def change
    create_table :taxon_relationships do |t|
      t.references :taxon, :null => false
      t.integer :other_taxon_id, :null => false
      t.references :taxon_relationship_type, :null => false

      t.timestamps
    end
  end
end
