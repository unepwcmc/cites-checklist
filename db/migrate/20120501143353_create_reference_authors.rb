class CreateReferenceAuthors < ActiveRecord::Migration
  def change
    create_table :reference_authors do |t|
      t.references :reference, :null => false
      t.references :author, :null => false
      t.integer :index

      t.timestamps
    end
  end
end
