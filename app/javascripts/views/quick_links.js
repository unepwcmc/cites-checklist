Checklist.QuickLinksView = Ember.View.extend({
  templateName: 'quick_links',

  pdfLink: function(options){
    var params = Checklist.get('router').get('filtersController').toParams();

    // For non-custom PDFs, maintain only the selected output layout
    if (!options.custom) {
      params = {output_layout: params.output_layout};
    }

    return Checklist.store.adapter.url +
      Checklist.Download.collectionUrl +
      options.type +
      "?" + $.param(params);
  },

  downloadIndexPdf: function(event) {
    window.location = this.pdfLink({type: 'index', custom: this.get('checked')});
  },

  downloadHistoryPdf: function(event) {
    window.location = this.pdfLink({type: 'history', custom: this.get('checked')});
  },
});
