Checklist.DownloadCollectionView = Ember.CollectionView.extend({
  tagName: 'ul',

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
    },

    isDownloadable: function() {
      return this.get('content.status') == 'completed';
    }.property(),

    didInsertElement: function() {
    }
  })
});
