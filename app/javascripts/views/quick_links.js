Checklist.QuickLinksView = Ember.View.extend({
  templateName: 'quick_links',

  docTypes: [
    'index',
    'history'
  ],

  quickLinksForView: function () {
    const that = this

    return this.get('docTypes').map(function (docType) {
      const id = docType + '-download'

      return {
        id: id,
        btnId: that.getBtnId(docType),
        doc_type: docType,
        title: Em.I18n.translations['featured.' + docType],
        href: '#' + id 
      }
    })
  }.property('docTypes'),
  
  didInsertElement: function () {
    const that = this

    this.docTypes.forEach(function (docType) {
      $("#" + that.getBtnId(docType)).colorbox(Checklist.CONFIG.colorbox);
    })
  },

  getBtnId: function (docType) {
    return docType + '-download-btn'
  },

  download: function (event) {
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

    $.colorbox.close()
  }
});
