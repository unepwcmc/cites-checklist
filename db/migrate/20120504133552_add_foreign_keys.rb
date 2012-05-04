class AddForeignKeys < ActiveRecord::Migration
  def change
    add_foreign_key "ranks", "ranks", :column => "parent_id"
    add_foreign_key "taxon_concepts", "designations"
    add_foreign_key "taxon_concepts", "taxon_concepts", :column => "parent_id"
    add_foreign_key "taxon_concepts", "ranks"
    add_foreign_key "taxon_relationships", "taxon_concepts"
    add_foreign_key "taxon_relationships", "taxon_relationship_types"
  end
end
