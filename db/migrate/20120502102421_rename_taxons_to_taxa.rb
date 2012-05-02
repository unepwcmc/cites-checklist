class RenameTaxonsToTaxa < ActiveRecord::Migration
    def change
        rename_table :taxons, :taxa
    end 
end
