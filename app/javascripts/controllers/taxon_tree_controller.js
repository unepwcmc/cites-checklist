Checklist.TaxonTreeController = Ember.ArrayController.create({
  content: Checklist.store.findAll(Checklist.TaxonTree),
});