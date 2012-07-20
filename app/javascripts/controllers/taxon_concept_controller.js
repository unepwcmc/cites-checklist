Checklist.taxonConceptController = Ember.ArrayController.create({
  content: Checklist.store.findAll(Checklist.Index)
});
