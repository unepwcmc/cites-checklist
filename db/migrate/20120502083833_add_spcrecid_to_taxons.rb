class AddSpcrecidToTaxons < ActiveRecord::Migration
  def change
    add_column :taxons, :spcrecid, :integer
  end
end
