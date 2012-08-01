Checklist.SavedSearchController = Ember.ArrayController.extend({
  content: Checklist.local_store.findAll(Checklist.SavedSearch),

  selectionDidChange: function() {
    var selection = this.get('selection').get('id');
    var record    = Checklist.local_store.find(Checklist.SavedSearch, selection);
    var filters   = JSON.parse(record.get('filters'));

    // I'm really not fond of this and will be changing it shortly
    var params = "";
    for (var key in filters) {
      params += key + "=";

      var values = filters[key];

      if (values instanceof Array) {
        values = values.join(",");
        values = "[" + values + "]";
      }

      params += values;
      params += "&";
    }

    Checklist.get('router').transitionTo('search',{params: params});
  }.observes('selection')
});
