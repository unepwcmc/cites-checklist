Checklist.QuickLinksView = Ember.View.extend({
  templateName: 'quick_links',

  download: function(event){
    var params = Checklist.get('router').get('filtersController').fullParams();

    var format = $(event.target).attr('data-format');
    var doc_type = $(event.target).attr('data-doc-type');
    ga('send', {
      hitType: 'event',
      eventCategory: 'Downloads: ' + doc_type + ' (full) ',
      eventAction: 'Format: ' + format
    });

    window.location = Checklist.store.adapter.url +
      Checklist.Download.collectionUrl + 'download_' + doc_type +
      "?" + $.param($.extend(params, {format: format, locale: Em.I18n.currentLocale}));
  }
});
