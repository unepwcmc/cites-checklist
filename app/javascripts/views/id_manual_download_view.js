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

  volumeOptions: function () {
    return this.get('volumes').map(function (volId) {
      return {id: volId, label: Em.I18n.t('id_manual_volume_' + volId)}
    })
  }.property('volumes'),

  downloadAll: function () {
    console.log('Download all')
  },

  toggleVolumesDropdown: function () {
    this.set('showVolumesDropdown', !this.get('showVolumesDropdown'))
  }
});
