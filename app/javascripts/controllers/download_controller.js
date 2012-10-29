Checklist.DownloadController = Ember.ArrayController.extend({
  generating: function() {
    console.log('gen');
    console.log(this.get('content.length'));
    return this.get('content').filter(
      function(item, index, enumerable) {
        return item.get('status') === "working";
      }
    );
  }.property('content.length'),

  complete: function() {
    console.log('com');
    console.log(this.get('content.length'));
    return this.get('content').filter(
      function(item, index, enumerable) {
        return item.get('status') === "completed";
      }
    );
  }.property('content.length'),

  content: Checklist.store.findQuery(Checklist.Download, {ids: function() {
    var store = Checklist.LocalStorageAdapter;
    return store.getAll(Checklist.Download);
  }()}),

  refresh: function() {
    this.set('content', this.contentFromIds());
  },

  contentFromIds: function() {
    return Checklist.store.findQuery(Checklist.Download, {ids: function() {
      var store = Checklist.LocalStorageAdapter;

      return store.getAll(Checklist.Download);
    }()});
  }
});
