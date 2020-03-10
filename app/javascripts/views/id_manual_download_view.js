Checklist.IdManualDownloadView = Ember.View.extend({
  templateName: 'id_manual_download_view',
  showVolumesDropdown: false,
  volumes: [
    '1',
    '6',
    '2',
    '3',
    '4',
    '5',
  ],
  selected: [],

  volumeOptions: function () {
    return this.get('volumes').map(function (volId) {
      return {id: volId, label: Em.I18n.t('id_manual_volume_' + volId)}
    })
  }.property('volumes'),

  didInsertElement: function() {
    $("#id-manual-download-btn").colorbox(Checklist.CONFIG.colorbox);
  },

  downloadSelected: function () {
    this.download(this.get('selected'))
  },

  downloadAll: function () {
    this.download(this.get('volumes'))
  },

  download: function (volumes) {
    var doc_type, format;
    var $el = $(event.target);

    if ($el.parents('a').length !== 0) {
      $el = $el.parents('a');
    }

    doc_type = $el.attr('data-doc-type').toLowerCase();
    format   = $el.attr('data-format');

    var download = Checklist.DownloadAdapter.createDownload(
      Checklist.DownloadIdManualVolume,
      {
        download: {
          doc_type: doc_type.toLowerCase(),
          format: format.toLowerCase()
        },
        locale: Em.I18n.currentLocale,
        volume: volumes
      }
    );
  },

  toggleVolumesDropdown: function () {
    this.set('showVolumesDropdown', !this.get('showVolumesDropdown'))
    Ember.run.next(this, $.colorbox.resize)
  },

  isDownloadSelectedDisabled: function () {
    return !this.get('selected.length')
  }.property('selected')
});
