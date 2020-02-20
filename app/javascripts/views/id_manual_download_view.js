Checklist.IdManualDownloadView = Ember.View.extend({
  templateName: 'id_manual_download_view',
  showVolumesDropdown: false,

  downloadAll: function () {
    console.log('Download all')
  },

  toggleVolumesDropdown: function () {
    this.set('showVolumesDropdown', !this.get('showVolumesDropdown'))
  }
});
