Checklist.SAPIAdapter = DS.Adapter.extend({
  findAll: function(store, type) {
    var url = this.url + type.url;
    jQuery.getJSON(url, {format: 'json', jsoncallback: '?'}, function(data) {
      // data is an Array of Hashes in the same order as the original
      // Array of IDs. If your server returns a root, simply do something
      // like:
      // store.loadMany(type, ids, data.people)
      store.loadMany(type, data);
    });
  }
});