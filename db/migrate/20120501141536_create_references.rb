class CreateReferences < ActiveRecord::Migration
  def change
    create_table :references do |t|
      t.string :title, :null => false
      t.string :year

      t.timestamps
    end
  end
end
