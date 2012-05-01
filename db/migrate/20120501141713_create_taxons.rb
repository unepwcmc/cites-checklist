class CreateTaxons < ActiveRecord::Migration
  def change
    create_table :taxons do |t|
      t.string :scientific_name, :null => false
      t.integer :parent_id
      t.integer :lft
      t.integer :rgt
      t.references :rank, :null => false

      t.timestamps
    end
  end
end
