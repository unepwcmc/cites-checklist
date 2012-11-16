Checklist.DownloadController = Ember.ArrayController.extend({
  sortProperties: ['id'],
  sortAscending: false,

  generating: function() {
    return this.get('content').filter(
      function(item, index, enumerable) {
        return item.get('status') === "working";
      }
    );
  }.property('content.length'),

  failed: function() {
    return this.get('content').filter(
      function(item, index, enumerable) {
        return item.get('status') === "failed";
      }
    );
  }.property('content.length'),

  complete: function() {
    return this.get('content').filter(
      function(item, index, enumerable) {
        return item.get('status') === "completed";
      }
    );
  }.property('content.length'),

  latest: function() {
    var that = this;
    var latest = this.get('content').filter(
      function(item, index, enumerable) {
        return item == that.get('content').get('lastObject');
      }
    );

    return latest;

    //if (latest.length > 0) {
      //if (latest[0].get('status') === "working") {
        //return latest;
      //}
    //}

    //return [];
  }.property('content.length'),

  content: Checklist.store.findQuery(Checklist.Download, {ids: (function() {
    var store = Checklist.LocalStorageAdapter;
    return store.getAll(Checklist.Download).map(function(item, index) {
      return item["id"];
    });
  })()}),

  /*
   * # Download status deltas
   *
   * To prevent unnecessary re-rendering of the download status views,
   * when polling we "cache" the status returned by the server and
   * compare it to the status we have stored locally. Only if the status
   * has changed do we update the `content` array to which the status
   * views are bound.
   */

  contentCache: [],
  refresh: function() {
    var store = Checklist.LocalStorageAdapter;
    var ids   = store.getAll(Checklist.Download).map(
      function(item, index) {
        return item["id"];
      });

    var content = Checklist.store.findQuery(Checklist.Download, {ids: ids});
    this.set('contentCache', content);
  },

  contentCacheDidChange: function() {
    var store = Checklist.LocalStorageAdapter;

    // Filter the status data from the server by whether or not the
    // status value has changed compared to the local version.
    var changed = this.get('contentCache').filter(function(item, index) {
      var current = store.getById(Checklist.Download, item.get('id'));

      store.setById(Checklist.Download, item.get('id'),
        { id: item.get('id'), status: item.get('status') });

      return !(current.status == item.get('status'));
    });

    if (changed.length > 0) {
      this.set('content', this.get('contentCache'));
    }
  }.observes('contentCache.isLoaded'),

  _interval: null,
  startPolling: function() {
    if (this.get('_interval') == null) {
      var that = this;
      var id = setInterval(function() {
        that.refresh();
      }, 10000);

      this.set('_interval', id);
    }
  },
  stopPolling: function() {
    if (this.get('_interval') != null) {
      clearInterval(this.get('_interval'));
    }
  }
});
