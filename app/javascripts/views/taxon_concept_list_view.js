Checklist.TaxonConceptList = Ember.CollectionView.extend({
  tagName: 'ul',
  content: null,
  itemViewClass: Ember.View.extend({
    templateName: 'taxon_concept_view'
  })
});
