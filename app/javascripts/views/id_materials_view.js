ACTION = 'documents'
DOCS_ENDPOINT = Checklist.CONFIG.backend_url + ACTION

Checklist.IdMaterialsView = Ember.View.extend({
  templateName: 'id_materials_view',
  taxonConceptName: '',
  taxonConceptId: 0, 
  idMaterials: [],

  didInsertElement: function () {
    this.loadIdMaterials()
  },

  loadIdMaterials: function () {
    var promise = new RSVP.Promise()
    var that = this

    $.ajax({
      url: DOCS_ENDPOINT,
      dataType: 'json',
      data: {
        taxon_concepts_ids: [that.get('taxonConceptId')],
        document_type: 'Document::VirtualCollege',
        locale: Em.I18n.currentLocale
      },
      success: function(data){
        that.set('idMaterials', that.getIdMaterialsForView(data.documents))
        promise.resolve(ACTION);
      },
      error: function(xhr, msg){
        promise.reject(msg);
      }
    })
    
    return promise
  },
    
  getIdMaterialsForView: function (idMaterials) {
    that = this
    
    return idMaterials.map(function (material) {      
      return $.extend({}, material.locale_document[0], {
        languagesString: that.getLanguagesString(material),
        url: DOCS_ENDPOINT + '/' + material.locale_document[0].id
      })
    })
  },


  getLanguagesString: function (material) {
    return material
      .document_language_versions
      .map(function (m) { return m.language })
      .join(', ')
  },

  downloadIdManualEntries: function () {
    var doc_type, format;
    var $el = $(event.target);

    if ($el.parents('a').length !== 0) {
      $el = $el.parents('a');
    }

    doc_type = $el.attr('data-doc-type').toLowerCase();
    format   = $el.attr('data-format');

    var download = Checklist.DownloadAdapter.createDownload(
      Checklist.DownloadIdManual,
      {
        download: {
          doc_type: doc_type.toLowerCase(),
          format: format.toLowerCase()
        },
        intro: $('#include-intro').is(':checked'),
        locale: Em.I18n.currentLocale,
        taxon_concept_id: this.get('taxonConceptId'),
        document_type: 'Document::IdManual'
      }
    );
  }
});
