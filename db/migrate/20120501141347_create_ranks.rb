class CreateRanks < ActiveRecord::Migration
  def change
    create_table :ranks do |t|
      t.string :name, :null => false
      t.integer :parent_id

      t.timestamps
    end
  end
end
