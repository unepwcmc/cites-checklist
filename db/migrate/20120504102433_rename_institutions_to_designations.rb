class RenameInstitutionsToDesignations < ActiveRecord::Migration
  def up
    drop_table :taxons_institutions
    rename_table :institutions, :designations
    add_column :taxa, :designation_id, :integer, :null => false
  end
  def down
    
  end
end
