Checklist.PdfDownloadView = Em.View.extend({
  templateName: 'pdf_download_view',
  filtersController: null,

  indexPdfLink: function(){
    return Checklist.store.adapter.url +
    Checklist.Index.urlFromParams(
      $.extend(
        this.get('filtersController').toParams(),
        {'format' : 'pdf'}
      )
    );
  }.property().volatile(),

  historyPdfLink: function(){
    return Checklist.store.adapter.url +
    Checklist.History.urlFromParams(
      $.extend(
        this.get('filtersController').toParams(),
        {'format' : 'pdf'}
      )
    );
  }.property().volatile(),

  downloadCustomIndexPdf: function(event) {
    window.location = this.get('indexPdfLink')
  },

  downloadCustomHistoryPdf: function(event) {
    window.location = this.get('historyPdfLink');
  }

});