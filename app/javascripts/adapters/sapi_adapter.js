Checklist.SAPIAdapter = DS.Adapter.extend({
  findAll: function(store, type) {
    var url = this.url + type.collectionUrl;

    $.ajaxCors(url, "get", {}, "json", this, function(data) {
      store.loadMany(type, data);
    });
  },

  findQuery: function(store, type, query, modelArray) {
    var url = this.url + type.collectionUrl;

    $.ajaxCors(url, "get", query, "json", this, function(data) {
      modelArray.load(data);
    });
  },

  findMany: function(store, type, ids) {
    var url = this.url + type.url;
    url = url.fmt(ids.join(','));

    $.ajaxCors(url, "get", {}, "json", this, function(data) {
      store.loadMany(type, ids, data);
    });
  }
});
