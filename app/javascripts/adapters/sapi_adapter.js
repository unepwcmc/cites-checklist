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

/*
 * Ember Data is unstable and doesn't work as expected.
 * When creating a record it doesn't properly return
 * the data from the server. Because of this, we send a request to the
 * server using a special Download Adapter and manually handle the
 * loading of the response from the server.
 */
Checklist.DownloadAdapter = {
  createDownload: function(type, query) {
    var url = Checklist.CONFIG.backend_url + type.collectionUrl;

    //FIXME: **TEMPORARY WORK AROUND**
    if (type.collectionUrl == 'documents/volume_download/') {
      window.open(url + '?' + $.param(query))
      return
    }
    Checklist.get('router').get('downloadController').set('latest', []);

    $.ajaxCors(url, "post", query, "json", this, function(data) {
      if (data.length !== undefined) {
        data = JSON.parse(data);
      }

      var download = Checklist.local_store.createRecord(
        type, data
      );

      Checklist.local_store.commit();

      var downloadController = Checklist.get('router').get('downloadController');

      downloadController.set('latest', [download]);

      var store = Checklist.LocalStorageAdapter;
      var ids   = store.getAll(Checklist.Download).map(
        function(item, index) {
          return item.id;
        });

      var content = Checklist.store.findQuery(Checklist.Download, {ids: ids});
      downloadController.set('content', content);

      downloadController.startPolling();
    });
  }
};
