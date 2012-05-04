class RemoveScientificNameFromTaxonConcepts < ActiveRecord::Migration
  def change
    remove_column :taxon_concepts, :scientific_name
  end
end
