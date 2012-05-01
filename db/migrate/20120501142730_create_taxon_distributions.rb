class CreateTaxonDistributions < ActiveRecord::Migration
  def change
    create_table :taxon_distributions do |t|
      t.references :taxon, :null => false
      t.references :distribution, :null => false

      t.timestamps
    end
  end
end
