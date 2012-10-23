Handlebars.registerHelper("commaify", function(value, options) {
  var context = (options.contexts && options.contexts[0]) || this;

  value = Ember.Handlebars.getPath(context, value, options);
  value = new String(value);

  value = value.split("").reverse();

  // http://stackoverflow.com/a/7125034
  var comma_value = "";
  for ( var i = 0; i <= value.length-1; i++ ){
    comma_value = value[i] + comma_value;
    if ((i+1) % 3 == 0 && (value.length-1) !== i) comma_value = ',' + comma_value;
  }

  return new Handlebars.SafeString(comma_value);
});

Checklist.DownloadView = Em.View.extend({
  templateName: 'download_view',

  download: function(doc_type, format) {
    var download = Checklist.download_store.createRecord(
      Checklist.Download,
      {
        id: Checklist.Helpers.generateId(),
        doc_type: 'index',
        format: 'pdf'
      }
    );

    Checklist.download_store.commit();

    Checklist.get('router').get('downloadController').refresh();
  },

  didInsertElement: function() {
    $("#download").colorbox(Checklist.Helpers.colorboxSettings);

    var pdf_cf = new CustomFormElements({
      cssClass: 'styled'
    });
  }
});
