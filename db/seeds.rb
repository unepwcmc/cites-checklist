# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

#Create rank seeds
parent_rank = nil
puts "#{Rank.delete_all} ranks deleted"
['Kingdom', 'Phylum', 'Class', 'Order', 'Family', 'Genus', 'Species'].each do |rank|
  rank = Rank.create(:name => rank, :parent_id => parent_rank)
  parent_rank = rank.id
  puts "Added rank #{rank.name}, with id #{rank.id}"
end

#Create institution seeds
puts "#{Institution.delete_all} institutions deleted"
['CITES', 'CMS'].each do |institution|
  Institution.create(:name => institution)
end
cites = Institution.find_by_name('CITES')
cms = Institution.find_by_name('CMS')
#Create taxon seeds
puts "#{Taxon.delete_all} taxons deleted"

kingdom = Taxon.create(:rank_id => Rank.find_by_name('Kingdom'), :scientific_name => 'Animalia')
kingdom.institutions = Institution.all
phylum = Taxon.create(:rank_id => Rank.find_by_name('Phylum'), :scientific_name => 'Chordata', :parent_id => kingdom.id)
phylum.institutions = Institution.all
klass = Taxon.create(:rank_id => Rank.find_by_name('Class'), :scientific_name => 'Mammalia', :parent_id => phylum.id)
klass.institutions = Institution.all

#honey badger
order = Taxon.create(:rank_id => Rank.find_by_name('Order'), :scientific_name => 'Carnivora', :parent_id => klass.id)
order.institutions = Institution.all
family = Taxon.create(:rank_id => Rank.find_by_name('Family'), :scientific_name => 'Mustelidae', :parent_id => order.id)
family.institutions = [cites]
genus = Taxon.create(:rank_id => Rank.find_by_name('Genus'), :scientific_name => 'Mellivora', :parent_id => family.id)
genus.institutions = [cites]
species = Taxon.create(:rank_id => Rank.find_by_name('Species'), :scientific_name => 'Mellivora capensis', :parent_id => genus.id)
species.institutions = [cites]
#loxodonta
order = Taxon.create(:rank_id => Rank.find_by_name('Order'), :scientific_name => 'Proboscidea', :parent_id => klass.id)
order.institutions = Institution.all
family = Taxon.create(:rank_id => Rank.find_by_name('Family'), :scientific_name => 'Elephantidae', :parent_id => order.id)
family.institutions = Institution.all
genus = Taxon.create(:rank_id => Rank.find_by_name('Genus'), :scientific_name => 'Loxodonta', :parent_id => family.id)
genus.institutions = Institution.all
#loxodonta africana CITES
loxodonta_cites = Taxon.create(
  :rank_id => Rank.find_by_name('Species'),
  :scientific_name => 'Loxodonta africana', :parent_id => genus.id
)
loxodonta_cites.institutions = [cites]
#loxodonta africana CMS
loxodonta_cms1 = Taxon.create(
  :rank_id => Rank.find_by_name('Species'),
  :scientific_name => 'Loxodonta africana', :parent_id => genus.id
)
loxodonta_cms1.institutions = [cms]
loxodonta_cms2 = Taxon.create(
  :rank_id => Rank.find_by_name('Species'),
  :scientific_name => 'Loxodonta cyclotis', :parent_id => genus.id
)
loxodonta_cms2.institutions = [cms]

#Create taxon relationship type seeds
puts "#{TaxonRelationshipType.delete_all} taxon relationship types deleted"
['has_component', 'is_component_of'].each do |relationship|
  TaxonRelationshipType.create(:name => relationship)
end

#Create loxodonta relationship seeds
puts "#{TaxonRelationship.delete_all} taxon relationships deleted"
TaxonRelationship.create(
  :taxon_id => loxodonta_cites, :other_taxon_id => loxodonta_cms1,
  :taxon_relationship_type_id => TaxonRelationshipType.find_by_name('has_component')
)
TaxonRelationship.create(
  :taxon_id => loxodonta_cites, :other_taxon_id => loxodonta_cms2,
  :taxon_relationship_type_id => TaxonRelationshipType.find_by_name('has_component')
)
TaxonRelationship.create(
  :taxon_id => loxodonta_cms1, :other_taxon_id => loxodonta_cites,
  :taxon_relationship_type_id => TaxonRelationshipType.find_by_name('is_component_of')
)
TaxonRelationship.create(
  :taxon_id => loxodonta_cms2, :other_taxon_id => loxodonta_cites,
  :taxon_relationship_type_id => TaxonRelationshipType.find_by_name('is_component_of')
)