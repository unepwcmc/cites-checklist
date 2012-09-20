Checklist.SavedSearchController = Ember.ArrayController.extend({
  content: Checklist.local_store.findAll(Checklist.SavedSearch),

  count: function() {
    var length = this.get('content').get('length');

    if (length > 0) {
      return length + " saved " + (length > 1 ? "searches" : "search");
    }
  }.property('@each')
});
