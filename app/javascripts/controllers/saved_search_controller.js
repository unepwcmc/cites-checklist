Checklist.SavedSearchController = Ember.ArrayController.extend({
  content: Checklist.local_store.findAll(Checklist.SavedSearch),

  selectionDidChange: function() {
    var selection = this.get('selection').get('id');
    var record    = Checklist.local_store.find(Checklist.SavedSearch, selection);
    var filters   = JSON.parse(record.get('filters'));

    var params = $.param(filters);

    Checklist.get('router').transitionTo('search',{params: params});
  }.observes('selection')
});
