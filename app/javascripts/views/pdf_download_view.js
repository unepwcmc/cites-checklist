Checklist.PdfDownloadView = Em.View.extend({
  templateName: 'pdf_download_view',
  filtersController: null,

  /*
   * Returns the URL for the desired PDF.
   *
   * @params [Object] an object with the following keys:
   *    { type: <Checklist Model>,
   *      custom: <Boolean>(Use current params or not) }
   */
  pdfLink: function(options){
    if (typeof options !== "object") {
      options = { type: "Index",
                  custom: false };
    }

    params = this.get('filtersController').toParams();

    // For non-custom PDFs, maintain only the selected output layout
    if (!options.custom) {
      params = {output_layout: params.output_layout}
    }

    return Checklist.store.adapter.url +
    Checklist[options.type].urlFromParams(
      $.extend(
        params,
        {'format' : 'pdf'}
      )
    );
  },

  downloadIndexPdf: function(event) {
    window.location = this.pdfLink({type: 'Index', custom: false});
  },

  downloadHistoryPdf: function(event) {
    window.location = this.pdfLink({type: 'History', custom: false});
  },

  downloadCustomIndexPdf: function(event) {
    window.location = this.pdfLink({type: 'Index', custom: true});
  },

  downloadCustomHistoryPdf: function(event) {
    window.location = this.pdfLink({type: 'History', custom: true});
  }

});
