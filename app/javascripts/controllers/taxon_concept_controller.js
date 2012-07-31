Checklist.TaxonConceptController = Ember.ArrayController.extend({
  content: Checklist.store.findAll(Checklist.Index)
});
