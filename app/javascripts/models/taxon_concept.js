Checklist.TaxonConcept = DS.Model.extend({
  taxon_name: DS.belongsTo('Checklist.TaxonName', { embedded: true }),
  parent: DS.belongsTo('Checklist.TaxonConcept', { key: 'parent_id'}),
  depth: DS.attr('number'),
  rank_name: DS.attr('string'),
  class_name: DS.attr('string'),
  family_name: DS.attr('string'),
  full_name: DS.attr('string')
});

Checklist.TaxonConcept.reopenClass({
  collectionUrl: 'taxon_concepts'
});