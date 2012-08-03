Checklist.SavedSearchController = Ember.ArrayController.extend({
  content: Checklist.local_store.findAll(Checklist.SavedSearch),
});
