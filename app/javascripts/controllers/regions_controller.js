Checklist.regionsController = Ember.ArrayController.create({
  content: Checklist.store.findAll(Checklist.Region)
});