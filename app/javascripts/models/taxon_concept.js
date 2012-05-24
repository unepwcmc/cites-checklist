Checklist.TaxonConcept = DS.Model.extend({
  taxon_name: DS.belongsTo('Checklist.TaxonName', { embedded: true }),
  depth: DS.attr('number'),
  scientific_name: DS.attr('string'),
  rank_name: DS.attr('string')
});

Checklist.TaxonConcept.reopenClass({
  collectionUrl: 'taxon_concepts'
});