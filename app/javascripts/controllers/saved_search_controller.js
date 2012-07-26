Checklist.savedSearchController = Ember.ArrayController.create({
  content: Checklist.local_store.findAll(Checklist.SavedSearch)
});
