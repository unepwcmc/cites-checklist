class CreateDistributions < ActiveRecord::Migration
  def change
    create_table :distributions do |t|

      t.timestamps
    end
  end
end
