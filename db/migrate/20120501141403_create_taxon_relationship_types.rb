class CreateTaxonRelationshipTypes < ActiveRecord::Migration
  def change
    create_table :taxon_relationship_types do |t|
      t.string :name, :null => false

      t.timestamps
    end
  end
end
