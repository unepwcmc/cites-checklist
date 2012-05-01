class Taxon < ActiveRecord::Base
  attr_accessible :lft, :parent_id, :rgt, :scientific_name
end
