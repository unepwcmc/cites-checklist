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

  latest: [],

  content: Checklist.store.findQuery(Checklist.Download, {ids: (function() {
    var store = Checklist.LocalStorageAdapter;
    return store.getAll(Checklist.Download).map(function(item, index) {
      return item.id;
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
    // Retrieve the IDs of all the downloads we are currently monitoring
    // (defined by those stored in localStorage)
    var store = Checklist.LocalStorageAdapter;
    var ids   = store.getAll(Checklist.Download).map(
      function(item, index) {
        return item.id;
      });

    // Query the server to return the current state of the objects for
    // the ids calculated above
    var content = Checklist.store.findQuery(Checklist.Download, {ids: ids});

    // This cache is used to get a delta of each download's status
    // relative to the server. If no changes have occurred, the cache
    // will not be used
    this.set('contentCache', content);
  },

  contentCacheDidChange: function() {
    var store = Checklist.LocalStorageAdapter;

    // Filter the status data from the server by whether or not the
    // status value has changed compared to the local version.
    //
    // Returns only downloads with statuses that have changed.
    var changed = this.get('contentCache').filter(function(item, index) {
      var current = store.getById(Checklist.Download, item.get('id'));

      // Update localStorage with new (possible unchanged) statuses
      // returned by the server
      store.setById(Checklist.Download, item.get('id'),
        { id: item.get('id'), status: item.get('status') });

      return !(current.status == item.get('status'));
    });

    if (this.get('contentCache.length') > 0) {
      var latest = this.get('latest').objectAt(0);

      if (latest !== undefined) {
        var new_latest = this.get('contentCache').findProperty('id', latest.get('id'));

        if (latest.get('status') !== new_latest.get('status')) {
          this.set('latest', [new_latest]);
        }
      }
    }

    if (changed.length > 0) {
      this.set('content', this.get('contentCache'));
    }
  }.observes('contentCache.isLoaded'),

  _interval: null,
  startPolling: function() {
    if (this.get('_interval') === null) {
      var that = this;
      var id = setInterval(function() {
        that.refresh();
      }, 10000);

      this.set('_interval', id);
    }
  },
  stopPolling: function() {
    if (this.get('_interval') !== null) {
      clearInterval(this.get('_interval'));
    }
  }
});
