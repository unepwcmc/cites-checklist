Checklist.IdManualDownloadView = Ember.View.extend({
  templateName: 'id_manual_download_view',
  showVolumesDropdown: false,
  volumes: [
    'id_manual_volume_1',
    'id_manual_volume_1_flora',
    'id_manual_volume_2',
    'id_manual_volume_3',
    'id_manual_volume_4',
    'id_manual_volume_5_parts',
  ],

  volumeOptions: function () {
    return this.get('volumes').map(function (volId) {
      return {id: volId, label: Em.I18n.t(volId)}
    })
  }.property('volumes'),

  downloadAll: function () {
    console.log('Download all')
  },

  toggleVolumesDropdown: function () {
    this.set('showVolumesDropdown', !this.get('showVolumesDropdown'))
  }
});
