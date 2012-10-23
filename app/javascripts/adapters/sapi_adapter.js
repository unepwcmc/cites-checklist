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
  },

  createRecord: function(store, type, record) {
    var url = this.url + type.collectionUrl;

    var that = this;
    var root = this.rootForType(type);

    var data = {};
    data[root] = this.toJSON(record, { includeId: true });

    $.ajaxCors(url, "post", query, "json", this, function(data) {
      store.didCreateRecord(store, type, record, data);
    });
  },

  rootForType: function(type) {
    if (type.url) { return type.url; }

    // use the last part of the name as the URL
    var parts = type.toString().split(".");
    var name = parts[parts.length - 1];
    return name.replace(/([A-Z])/g, '_$1').toLowerCase().slice(1);
  }
});
