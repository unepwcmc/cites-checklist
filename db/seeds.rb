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
['Kingdom', 'Phylum', 'Class', 'Order', 'Family', 'Genus', 'Species', 'Subspecies'].each do |rank|
  rank = Rank.create(:name => rank, :parent_id => parent_rank)
  parent_rank = rank.id
  puts "Added rank #{rank.name}, with id #{rank.id}"
end

#Create designation seeds
puts "#{Designation.delete_all} designations deleted"
['CITES', 'CMS'].each do |designation|
  Designation.create(:name => designation)
end
cites = Designation.find_by_name('CITES')
cms = Designation.find_by_name('CMS')
#Create taxon seeds
puts "#{TaxonConcept.delete_all} taxon_concepts deleted"

kingdom = TaxonConcept.create(:rank_id => Rank.find_by_name('Kingdom').id,
  :scientific_name => 'Animalia', :designation_id => cites.id)
phylum = TaxonConcept.create(:rank_id => Rank.find_by_name('Phylum').id,
  :scientific_name => 'Chordata', :parent_id => kingdom.id,
  :designation_id => cites.id)
phylum.designation = cites
klass = TaxonConcept.create(:rank_id => Rank.find_by_name('Class').id,
  :scientific_name => 'Mammalia', :parent_id => phylum.id,
  :designation_id => cites.id)

#honey badger
order = TaxonConcept.create(:rank_id => Rank.find_by_name('Order').id,
  :scientific_name => 'Carnivora', :parent_id => klass.id,
  :designation_id => cites.id)
family = TaxonConcept.create(:rank_id => Rank.find_by_name('Family').id,
  :scientific_name => 'Mustelidae', :parent_id => order.id,
  :designation_id => cites.id)
genus = TaxonConcept.create(:rank_id => Rank.find_by_name('Genus').id,
  :scientific_name => 'Mellivora', :parent_id => family.id,
  :designation_id => cites.id)
species = TaxonConcept.create(:rank_id => Rank.find_by_name('Species').id,
  :scientific_name => 'Mellivora capensis', :parent_id => genus.id,
  :designation_id => cites.id)

#loxodonta
order = TaxonConcept.create(:rank_id => Rank.find_by_name('Order').id,
  :scientific_name => 'Proboscidea', :parent_id => klass.id,
  :designation_id => cites.id)
family = TaxonConcept.create(:rank_id => Rank.find_by_name('Family').id,
  :scientific_name => 'Elephantidae', :parent_id => order.id,
  :designation_id => cites.id)
genus = TaxonConcept.create(:rank_id => Rank.find_by_name('Genus').id,
  :scientific_name => 'Loxodonta', :parent_id => family.id,
  :designation_id => cites.id)
#loxodonta africana CITES
loxodonta_cites = TaxonConcept.create(
  :rank_id => Rank.find_by_name('Species').id,
  :scientific_name => 'Loxodonta africana', :parent_id => genus.id,
  :designation_id => cites.id)
#loxodonta africana CMS
loxodonta_cms1 = TaxonConcept.create(
  :rank_id => Rank.find_by_name('Species').id,
  :scientific_name => 'Loxodonta africana', :parent_id => genus.id,
  :designation_id => cms.id
)
loxodonta_cms2 = TaxonConcept.create(
  :rank_id => Rank.find_by_name('Species').id,
  :scientific_name => 'Loxodonta cyclotis', :parent_id => genus.id,
  :designation_id => cms.id)

#Create taxon relationship type seeds
puts "#{TaxonRelationshipType.delete_all} taxon relationship types deleted"
['has_part', 'is_part_of', 'is_synonym'].each do |relationship|
  TaxonRelationshipType.create(:name => relationship)
end

#Create loxodonta relationship seeds
puts "#{TaxonRelationship.delete_all} taxon relationships deleted"
TaxonRelationship.create(
  :taxon_concept_id => loxodonta_cites.id, :other_taxon_concept_id => loxodonta_cms1.id,
  :taxon_relationship_type_id => TaxonRelationshipType.find_by_name('has_part').id
)
TaxonRelationship.create(
  :taxon_concept_id => loxodonta_cites.id, :other_taxon_concept_id => loxodonta_cms2.id,
  :taxon_relationship_type_id => TaxonRelationshipType.find_by_name('has_part').id
)
TaxonRelationship.create(
  :taxon_concept_id => loxodonta_cms1.id, :other_taxon_concept_id => loxodonta_cites.id,
  :taxon_relationship_type_id => TaxonRelationshipType.find_by_name('is_part_of').id
)
TaxonRelationship.create(
  :taxon_concept_id => loxodonta_cms2.id, :other_taxon_concept_id => loxodonta_cites.id,
  :taxon_relationship_type_id => TaxonRelationshipType.find_by_name('is_part_of').id
)

kingdom = TaxonConcept.create(:rank_id => Rank.find_by_name('Kingdom').id,
  :scientific_name => 'Plantae', :designation_id => cites.id)
order = TaxonConcept.create(:rank_id => Rank.find_by_name('Order').id,
  :scientific_name => 'Violales', :parent_id => kingdom.id,
  :designation_id => cites.id)
family = TaxonConcept.create(:rank_id => Rank.find_by_name('Family').id,
  :scientific_name => 'Violaceae', :parent_id => order.id,
  :designation_id => cites.id)
genus = TaxonConcept.create(:rank_id => Rank.find_by_name('Genus').id,
  :scientific_name => 'Viola', :parent_id => family.id,
  :designation_id => cites.id)
viola_montana = TaxonConcept.create(:rank_id => Rank.find_by_name('Species').id,
  :scientific_name => 'Viola montana L.', :parent_id => genus.id,
  :designation_id => cites.id)
viola_canina = TaxonConcept.create(:rank_id => Rank.find_by_name('Species').id,
  :scientific_name => ' Viola canina L.', :parent_id => genus.id,
  :designation_id => cites.id)
viola_canina_ssp = TaxonConcept.create(:rank_id => Rank.find_by_name('Subspecies').id,
  :scientific_name => 'Viola canina L. ssp. montana (L.) Hartman ', :parent_id => viola_canina.id,
  :designation_id => cites.id)

TaxonRelationship.create(
  :taxon_concept_id => viola_montana.id, :other_taxon_concept_id => viola_canina_ssp.id,
  :taxon_relationship_type_id => TaxonRelationshipType.find_by_name('is_synonym').id
)
TaxonRelationship.create(
  :taxon_concept_id => viola_canina_ssp.id, :other_taxon_concept_id => viola_montana.id,
  :taxon_relationship_type_id => TaxonRelationshipType.find_by_name('is_synonym').id
)