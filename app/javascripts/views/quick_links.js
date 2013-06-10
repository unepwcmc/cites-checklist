Checklist.QuickLinksView = Ember.View.extend({
  templateName: 'quick_links',

  download: function(event){
    var params = Checklist.get('router').get('filtersController').fullParams();

    var format = $(event.target).attr('data-format');
    window.location = Checklist.store.adapter.url +
      Checklist.Download.collectionUrl + 'download_' +
      $(event.target).attr('data-doc-type') +
      "?" + $.param($.extend(params, {format: format}));
  },
});
