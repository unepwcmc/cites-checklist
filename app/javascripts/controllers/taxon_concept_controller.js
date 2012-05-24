Checklist.TaxonConceptController = Ember.ArrayController.create({
  content: Checklist.store.findAll(Checklist.TaxonConcept)
});