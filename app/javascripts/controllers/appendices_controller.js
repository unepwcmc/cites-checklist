Checklist.appendicesController = Ember.ArrayController.create({
  content: Checklist.store.findAll(Checklist.Appendix)
});