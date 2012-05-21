Checklist.SAPIAdapter = DS.Adapter.extend({
  findAll: function(store, type) {
    var url = this.url + type.collectionUrl;
    jQuery.getJSON(url, {format: 'json', jsoncallback: '?'}, function(data) {
      // data is an Array of Hashes in the same order as the original
      // Array of IDs. If your server returns a root, simply do something
      // like:
      // store.loadMany(type, ids, data.people)
      store.loadMany(type, data);
    });
  },
  findQuery: function(store, type, query, modelArray) {
    var url = this.url + type.collectionUrl;
    jQuery.getJSON(url, query, function(data) {
        // data is expected to be an Array of Hashes, in an order
        // determined by the server. This order may be specified in
        // the query, and will be reflected in the view.
        //
        // If your server returns a root, simply do something like:
        // modelArray.load(data.people)
        modelArray.load(data);
    });
  }
});