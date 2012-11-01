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

  refresh: function() {
    this.set('content', this.contentFromIds());
  },

  contentFromIds: function() {
    return Checklist.store.findQuery(Checklist.Download, {ids: (function() {
      var store = Checklist.LocalStorageAdapter;

      return store.getAll(Checklist.Download).map(function(item, index) {
        return item["id"];
      });
    })()});
  },

  _interval: null,
  startPolling: function() {
    if (this.get('_interval') == null) {
      var that = this;
      var id = setInterval(function() {
        that.refresh();
      }, 5000);

      this.set('_interval', id);
    }
  },
  stopPolling: function() {
    if (this.get('_interval') != null) {
      clearInterval(this.get('_interval'));
    }
  }
});
