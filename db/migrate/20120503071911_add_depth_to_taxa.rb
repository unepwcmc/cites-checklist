class AddDepthToTaxa < ActiveRecord::Migration
  def change
    add_column :taxa, :depth, :integer
  end
end
