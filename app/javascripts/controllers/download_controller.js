Checklist.DownloadController = Ember.Object.extend({
  content: function() {
    return this.contentFromIds();
  },

  refresh: function() {
    this.set('content', this.contentFromIds());
  },

  contentFromIds: function() {
    Checklist.store.findQuery(Checklist.Download, {ids: function() {
      var store = Checklist.LocalStorageAdapter;

      return store.getAll(Checklist.Download);
    }});
  }
});
