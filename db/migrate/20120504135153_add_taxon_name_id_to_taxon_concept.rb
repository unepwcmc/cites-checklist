class AddTaxonNameIdToTaxonConcept < ActiveRecord::Migration
  def change
    TaxonRelationship.delete_all
    TaxonConcept.delete_all
    add_column :taxon_concepts, :taxon_name_id, :integer, :null => false
    add_foreign_key :taxon_concepts, :taxon_names
  end
end
