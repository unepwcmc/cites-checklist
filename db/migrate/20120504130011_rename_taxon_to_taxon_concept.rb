class RenameTaxonToTaxonConcept < ActiveRecord::Migration
  def change
    rename_table :taxa, :taxon_concepts
    rename_column :taxon_relationships, :taxon_id, :taxon_concept_id
    rename_column :taxon_relationships, :other_taxon_id, :other_taxon_concept_id
  end
end
