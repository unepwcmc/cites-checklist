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

  download: function(event) {
    var doc_type, format;
    var $el = $(event.target);

    if ($el.parents('a').length != 0) {
      $el = $el.parents('a');
    }

    doc_type = $el.attr('data-doc-type');
    format   = $el.attr('data-format');

    var params = Checklist.get('router').get('filtersController').toParams();

    window.location = Checklist.store.adapter.url +
    Checklist[doc_type].urlFromParams(
      $.extend(
        params,
        {'format' : format}
      )
    );
  },

  didInsertElement: function() {
    $("#history-download-btn").colorbox(Checklist.Helpers.colorboxSettings);
    $("#index-download-btn").colorbox(Checklist.Helpers.colorboxSettings);
  }
});
