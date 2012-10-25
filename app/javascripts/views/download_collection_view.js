Checklist.DownloadCollectionView = Ember.CollectionView.extend({
  tagName: 'ul',

  emptyView: Ember.View.extend({
    template: Ember.Handlebars.compile("No downloads")
  }),

  itemViewClass: Ember.View.extend({
    contextBinding: 'content',
    templateName: 'download_collection',

    download: function(event) {
      var id = $(event.target).attr('data-download-id');
      window.location = Checklist.Download.downloadUrl(id);
    },

    isDownloadable: function() {
      return this.get('content.status') == 'completed';
    }.property()
  })
});
