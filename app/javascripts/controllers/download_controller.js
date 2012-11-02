Checklist.DownloadController = Ember.ArrayController.extend({
  generating: function() {
    return this.get('content').filter(
      function(item, index, enumerable) {
        return item.get('status') === "working";
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

  content: Checklist.store.findQuery(Checklist.Download, {ids: (function() {
    var store = Checklist.LocalStorageAdapter;
    return store.getAll(Checklist.Download).map(function(item, index) {
      return item["id"];
    });
  })()}),

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
      this.set('content', Checklist.store.findQuery(Checklist.Download, {ids: (function() {
        var store = Checklist.LocalStorageAdapter;
        return store.getAll(Checklist.Download).map(function(item, index) {
          return item["id"];
        });
      })()}));
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
