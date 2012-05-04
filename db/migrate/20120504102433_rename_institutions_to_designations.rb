class RenameInstitutionsToDesignations < ActiveRecord::Migration
  def up
    Institution.delete_all
    TaxonRelationship.delete_all
    Taxon.delete_all
    drop_table :taxons_institutions
    rename_table :institutions, :designations
    add_column :taxa, :designation_id, :integer, :null => false
  end
  def down
    
  end
end
