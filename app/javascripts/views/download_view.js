Handlebars.registerHelper("commaify", function(value, options) {
  var context = (options.contexts && options.contexts[0]) || this;

  value = Ember.Handlebars.get(context, value, options);
  value = new String(value);

  if (!/^[0-9]+$/.test(value)) { return new Handlebars.SafeString(value); }

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

  download: function(event) {
    var doc_type, format;
    var $el = $(event.target);

    if ($el.parents('a').length != 0) {
      $el = $el.parents('a');
    }

    doc_type = $el.attr('data-doc-type').toLowerCase();
    format   = $el.attr('data-format');


    var params = Checklist.get('router').get('filtersController').toParams();
    window.location = Checklist.store.adapter.url +
    'download_' + doc_type + '.' + format + '?' +
    $.param(
      $.extend(
        params,
        {'format' : format}
      )
    )
    /*
    var download = Checklist.download_store.createRecord(
      Checklist.Download,
      {
        doc_type: doc_type.toLowerCase(),
        format: format.toLowerCase()
      }
    );

    Checklist.download_store.commit();

    Checklist.get('router').get('downloadController').refresh();
    */
  },

  didInsertElement: function() {
    $("#generating-download-btn").colorbox(Checklist.CONFIG.colorbox);
    $("#complete-download-btn").colorbox(Checklist.CONFIG.colorbox);

    $("#download-btn").colorbox(Checklist.CONFIG.colorbox);
  }
});
