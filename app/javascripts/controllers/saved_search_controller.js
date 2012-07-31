Checklist.SavedSearchController = Ember.ArrayController.extend({
  content: Checklist.local_store.findAll(Checklist.SavedSearch),

  selectionDidChange: function() {
    var selection = this.get('selection').get('id');
    var record    = Checklist.local_store.find(Checklist.SavedSearch, selection);
    var filters   = record.get('filters');

    /*
     * doSearch transition
     */
  }.observes('selection')
});
