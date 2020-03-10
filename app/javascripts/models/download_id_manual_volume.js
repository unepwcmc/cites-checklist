Checklist.DownloadIdManualVolume = DS.Model.extend({
  id: DS.attr('number'),
  doc_type: DS.attr('string'),
  display_name: DS.attr('string'),
  format: DS.attr('string'),
  created_at: DS.attr('string'),
  updated_at: DS.attr('string'),
  status: DS.attr('string')
});

Checklist.DownloadIdManualVolume.reopenClass({
  collectionUrl: 'documents/volume_download/',

  statusUrl: function(id) {
    return Checklist.store.adapter.url +
      this.collectionUrl +
      id;
  },

  downloadUrl: function(id) {
    return this.statusUrl(id) +
      '/download';
  }
});
