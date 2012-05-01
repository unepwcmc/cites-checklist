class CreateTaxonReferences < ActiveRecord::Migration
  def change
    create_table :taxon_references do |t|
      t.references :referenceable, :polymorphic => {:default => 'Taxon', :null => false}
      t.references :reference, :null => false

      t.timestamps
    end
  end
end
