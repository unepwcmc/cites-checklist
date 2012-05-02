# == Schema Information
#
# Table name: taxons
#
#  id              :integer         not null, primary key
#  scientific_name :string(255)     not null
#  parent_id       :integer
#  lft             :integer
#  rgt             :integer
#  rank_id         :integer         not null
#  created_at      :datetime        not null
#  updated_at      :datetime        not null
#

class Taxon < ActiveRecord::Base
  attr_accessible :lft, :parent_id, :rgt, :scientific_name, :rank_id, :parent_id
  belongs_to :rank
  has_and_belongs_to_many :institutions, :join_table => 'taxons_institutions'
  has_many :relationships, :class_name => "TaxonRelationship", :foreign_key => "taxon_id"
  has_many :inverse_relationships, :class_name => "TaxonRelationship", :foreign_key => "other_taxon_id"
end
