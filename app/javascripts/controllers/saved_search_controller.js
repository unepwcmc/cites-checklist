Checklist.SavedSearchController = Ember.ArrayController.extend({
  content: Checklist.local_store.findAll(Checklist.SavedSearch),

  selectionDidChange: function() {
    // The first item of the searches drop down is empty and this method
    // should return straight away if that's selected
    // Remove this line if we move away from using a drop down
    if (this.get('selection') == null) return;

    var selection = this.get('selection').get('id');
    var record    = Checklist.local_store.find(Checklist.SavedSearch, selection);
    var filters   = JSON.parse(record.get('filters'));

    var params = $.param(filters);

    Checklist.get('router').transitionTo('search',{params: params});
  }.observes('selection')
});
