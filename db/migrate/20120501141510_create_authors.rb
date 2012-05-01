class CreateAuthors < ActiveRecord::Migration
  def change
    create_table :authors do |t|
      t.string :first_name
      t.string :middle_name
      t.string :last_name, :null => false

      t.timestamps
    end
  end
end
