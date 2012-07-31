Checklist.RegionsController = Ember.ArrayController.extend({
  content: Checklist.store.findAll(Checklist.Region)
});