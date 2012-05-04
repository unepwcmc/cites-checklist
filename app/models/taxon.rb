# == Schema Information
#
# Table name: taxa
#
#  id              :integer         not null, primary key
#  scientific_name :string(255)     not null
#  parent_id       :integer
#  lft             :integer
#  rgt             :integer
#  rank_id         :integer         not null
#  created_at      :datetime        not null
#  updated_at      :datetime        not null
#  spcrecid        :integer
#  depth           :integer
#  designation_id  :integer         not null
#

class Taxon < ActiveRecord::Base
  attr_accessible :lft, :parent_id, :rgt, :scientific_name, :rank_id, :parent_id, :designation_id
  belongs_to :rank
  belongs_to :designation
  has_many :relationships, :class_name => 'TaxonRelationship', :dependent => :destroy
  has_many :related_taxons, :class_name => 'Taxon', :through => :relationships

  acts_as_nested_set

  def wholes
    related_taxons.includes(:relationships => :taxon_relationship_type).where(:taxon_relationship_types => {:name => 'has_part'})
  end
  def parts
    related_taxons.includes(:relationships => :taxon_relationship_type).where(:taxon_relationship_types => {:name => 'is_part_of'})
  end
  def synonyms
    related_taxons.includes(:relationships => :taxon_relationship_type).where(:taxon_relationship_types => {:name => 'is_synonym'})
  end
end
