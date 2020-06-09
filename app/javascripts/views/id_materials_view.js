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
    $.ajaxCors(
      DOCS_ENDPOINT,
      'get',
      {
        taxon_concepts_ids: [this.get('taxonConceptId')],
        document_type: 'Document::VirtualCollege',
        locale: Em.I18n.currentLocale
      },
      'json',
      this,
      function(data){
        if (this.isDestroyed) { return; }

        this.set('idMaterials', this.getIdMaterialsForView(data.documents))
      }
    )
  },

  getIdMaterialsForView: function (idMaterials) {
    that = this

    return idMaterials.map(function (material) {  
      return $.extend({}, 
        that.getLocaleOrPrimaryDocument(material),
        { 
          linkId: 'id-materials-link-' + material.primary_document_id,
          versions: that.getLanguageVersions(material)
        }
      )
    })
  },

  getLocaleOrPrimaryDocument: function (material) {
    let document = material.locale_document[0]

    if (!document) {
      document = material.document_language_versions.filter(function (version) {
        return version.id === parseInt(material.primary_document_id)
      })[0]
    }

    return document
  },

  updateLinkHref: function (event) {
    const linkId = event.target.dataset.linkId
    const documentId = event.target.value
    const linkEL = this.$('#' + linkId)

    linkEL.attr('href', this.getDocUrl(documentId))
    linkEL.removeClass('disabled')
  },

  getDocUrl: function (id) {
    return DOCS_ENDPOINT + '/' + id
  },

  getLanguageVersions: function (material) {
    return material
      .document_language_versions
      .map(function (m) { 
        return {
          language: m.language,
          id: m.id
        }
      })
  },

  checkForIdManualEntries: function () {
    $.ajaxCors(
      DOCS_ENDPOINT + '/check_doc_presence/',
      'get',
      {
        taxon_concept_id: this.get('taxonConceptId'),
        document_type: 'Document::IdManual',
        locale: Em.I18n.currentLocale
      },
      'json',
      this,
      function(data){
        if (this.isDestroyed) { return; }

        this.set('hasIdManualEntries', data)
      }
    )
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
