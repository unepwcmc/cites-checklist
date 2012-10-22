Checklist.TaxonConcept = DS.Model.extend({
  id: DS.attr('number'),
  parent: DS.belongsTo('Checklist.TaxonConcept', { key: 'parent_id' }),
  countries: DS.hasMany('Checklist.Country', { key: 'countries_ids' }),
  timelines_for_taxon_concept: DS.belongsTo('Checklist.TimelinesForTaxonConcept', { key: 'id' }),
  current_listing_changes: DS.hasMany('Checklist.ListingChange', { embedded : true }),
  rank_name: DS.attr('string'),
  spp: DS.attr('string'),
  current_listing: DS.attr('string'),
  phylum_name: DS.attr('string'),
  class_name: DS.attr('string'),
  order_name: DS.attr('string'),
  family_name: DS.attr('string'),
  genus_name: DS.attr('string'),
  full_name: DS.attr('string'),
  author_year: DS.attr('string'),
  cites_accepted: DS.attr('boolean'),
  recently_changed: DS.attr('boolean'),
  english: DS.attr('string', { key: 'english_names_list' }),
  spanish: DS.attr('string', { key: 'spanish_names_list' }),
  french: DS.attr('string', { key: 'french_names_list' }),
  synonyms: DS.attr('string', { key: 'synonyms_list' }),
  itemType: DS.attr('string', { key: 'item_type' }),
  ancestorsPath: DS.attr('string', { key: 'ancestors_path' }),
  higherTaxa: function(){
    return this.get('ancestorsPath').split(',');
  }.property()
});
