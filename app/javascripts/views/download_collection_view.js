Checklist.DownloadCollectionView = Ember.CollectionView.extend({
  tagName: 'ul',

  emptyView: Ember.View.extend({
    templateName: 'empty_download_collection_view',

    didInsertElement: function() {
      var opts = {
        lines: 13, // The number of lines to draw
        length: 2, // The length of each line
        width: 4, // The line thickness
        radius: 10, // The radius of the inner circle
        corners: 1, // Corner roundness (0..1)
        rotate: 0, // The rotation offset
        color: '#000', // #rgb or #rrggbb
        speed: 1, // Rounds per second
        trail: 60, // Afterglow percentage
        shadow: false, // Whether to render a shadow
        hwaccel: false, // Whether to use hardware acceleration
        className: 'spinner', // The CSS class to assign to the spinner
        zIndex: 900, // The z-index (defaults to 2000000000)
        top: 'auto', // Top position relative to parent in px
        left: 'auto' // Left position relative to parent in px
      };
      var target = document.getElementById('download_loading');
      var spinner = new Spinner(opts).spin(target);
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
      return this.get('content.status') == 'completed';
    }.property(),

    didInsertElement: function() {
    }
  })
});
