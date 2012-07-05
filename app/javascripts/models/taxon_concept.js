Checklist.TaxonConcept = DS.Model.extend({
  taxon_name: DS.belongsTo('Checklist.TaxonName', { embedded: true }),
  parent: DS.belongsTo('Checklist.TaxonConcept', { key: 'parent_id'}),
  depth: DS.attr('number'),
  rank_name: DS.attr('string'),
  current_listing: DS.attr('string'),
  class_name: DS.attr('string'),
  family_name: DS.attr('string'),
  full_name: DS.attr('string'),
  english: DS.attr('string'),
  spanish: DS.attr('string'),
  french: DS.attr('string'),
  spp: function(){
    if (this.get('rank_name') == 'GENUS' || this.get('rank_name') == 'FAMILY'
      || this.get('rank_name') == 'ORDER'){
      return 'spp.'
    } else {
      return null;
    }
  }.property('rank_name')
});

Checklist.TaxonConcept.reopenClass({
  collectionUrl: 'taxon_concepts'
});
