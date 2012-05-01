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
  attr_accessible :lft, :parent_id, :rgt, :scientific_name
end
