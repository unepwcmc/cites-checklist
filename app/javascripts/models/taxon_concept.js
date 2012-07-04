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
  hasLanguage: function(lng){
    if (this.get(lng.lowercase).length !== null){
      return true;
    } else { return false; }
  }
});

Checklist.TaxonConcept.reopenClass({
  collectionUrl: 'taxon_concepts'
});
