ACTION = 'documents'
DOCS_ENDPOINT = Checklist.CONFIG.backend_url + ACTION

Checklist.IdMaterialsView = Ember.View.extend({
  templateName: 'id_materials_view',
  taxonConceptName: '',
  taxonConceptId: 0,
  idMaterials: [],
  hasIdManualEntries: false,
  downloadIdManualButtonId: '',

  didInsertElement: function () {
    this.loadIdMaterials()
    this.checkForIdManualEntries()
  },

  downloadIdManualButtonId: function () {
    return "id-materials-id-manual-download" + "-" + this.get('taxonConceptId')
  }.property(),

  hasIdManualEntriesChanged: function() {
    const that = this

    if (that.get('hasIdManualEntries')) {
      Em.run.next(
        function () {
          $("#" + that.get('downloadIdManualButtonId')).colorbox(Checklist.CONFIG.colorbox)
        }
      )
    }
  }.observes('hasIdManualEntries'),

  hasIdMaterials: function () {
    return this.get('idMaterials').length || this.get('hasIdManualEntries')
  }.property('idMaterials', 'hasIdManualEntries'),

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
        if (that.isDestroyed) { return; }

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

    idMaterialsForLocale = idMaterials.filter(function (material) {
      return material.locale_document.length
    })

    return idMaterialsForLocale.map(function (material) {
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

  checkForIdManualEntries: function () {
    var promise = new RSVP.Promise()
    var that = this
    $.ajax({
      url: DOCS_ENDPOINT + '/check_doc_presence/',
      dataType: 'json',
      data: {
        taxon_concept_id: that.get('taxonConceptId'),
        document_type: 'Document::IdManual',
        locale: Em.I18n.currentLocale
      },
      success: function(data){
        if (that.isDestroyed) { return; }

        that.set('hasIdManualEntries', data)
        promise.resolve(ACTION);
      },
      error: function(xhr, msg){
        promise.reject(msg);
      }
    })

    return promise
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
      Checklist.Download,
      {
        download: {
          doc_type: doc_type.toLowerCase(),
          format: format.toLowerCase()
        },
        locale: Em.I18n.currentLocale,
        taxon_concept_id: this.get('taxonConceptId'),
        document_type: 'Document::IdManual'
      }
    );
  }
});
