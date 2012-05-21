Checklist.TaxonTree = DS.Model.extend({
  taxon_concepts: DS.hasMany('Checklist.TaxonConcept', { embedded: true})
});

Checklist.TaxonTree.reopenClass({
  collectionUrl: 'taxon_trees'
});