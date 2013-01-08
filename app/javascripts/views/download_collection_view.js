Checklist.DownloadCollectionView = Ember.CollectionView.extend({
  tagName: 'ul',

  emptyView: Ember.View.extend({
    templateName: 'empty_download_collection_view',

    didInsertElement: function() {
      var target = document.getElementById('download_loading');
      var spinner = new Spinner(Checklist.CONFIG.spinner).spin(target);
    }
  }),

  itemViewClass: Ember.View.extend({
    contextBinding: 'content',
    templateName: 'download_collection',

    title: function() {
      var type = this.content.get('doc_type');
      // Capitalise first letter for presentation purposes
      return type.charAt(0).toUpperCase() + type.slice(1);
    }.property(),

    download: function(event) {
      var id = $(event.target).attr('data-download-id');
      window.location = Checklist.Download.downloadUrl(id);
      $.colorbox.close();
    },

    isDownloadable: function() {
      return this.get('content.status') === 'completed';
    }.property(),
    isFailed: function() {
      return this.get('content.status') === 'failed';
    }.property(),

    removeById: function() {
      var id = this.content.get('id');
      var store = Checklist.LocalStorageAdapter;

      store.deleteById(Checklist.Download, id);

      this.get('parentView').get('content').removeObject(this.get('context'));
    },

    deleteAndClose: function() {
      var remaining = this.get('parentView').get('content.length');

      this.removeById();

      if (remaining <= 1) {
        $.colorbox.close();
      } else {
        $.colorbox.resize();
      }
    },

    didInsertElement: function() {
      $('#retry-download-btn').colorbox(Checklist.CONFIG.colorbox);

      this.$().find('a').each(function(index, item) {
        $(item).colorbox(Checklist.CONFIG.colorbox);
      });
    }
  })
});
