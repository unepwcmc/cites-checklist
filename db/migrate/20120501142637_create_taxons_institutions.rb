class CreateTaxonsInstitutions < ActiveRecord::Migration
  def change
    create_table :taxons_institutions, :id => false do |t|
      t.references :taxon, :null => false
      t.references :institution, :null => false
    end
  end

end
