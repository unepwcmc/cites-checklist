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
    if ((i+1) % 3 === 0 && (value.length-1) !== i) { comma_value = ',' + comma_value; }
  }

  return new Handlebars.SafeString(comma_value);
});

Checklist.DownloadView = Em.View.extend({
  templateName: 'download_view',

  download: function(event) {
    var doc_type, format;
    var $el = $(event.target);

    if ($el.parents('a').length !== 0) {
      $el = $el.parents('a');
    }

    doc_type = $el.attr('data-doc-type').toLowerCase();
    format   = $el.attr('data-format');

    var params = Checklist.get('router').get('filtersController').toParams();

    var download = Checklist.DownloadAdapter.createDownload(
      Checklist.Download,
      $.extend({
        download: {
          doc_type: doc_type.toLowerCase(),
          format: format.toLowerCase()
        },
        intro: $('#include-intro').is(':checked'),
        locale: Em.I18n.currentLocale
      }, params)
    );
  },

  downloadIdMaterials: function(event) {
    var $el = $(event.target);

    if ($el.parents('a').length !== 0) {
      $el = $el.parents('a');
    }

    var params = Checklist.get('router').get('filtersController').toParams();

    doc_type = $el.attr('data-doc-type').toLowerCase();
    format = $el.attr('data-format');

    var download = Checklist.DownloadAdapter.createDownload(
      Checklist.DownloadIdManual,
      $.extend({
        download: {
          doc_type: doc_type,
          format: format.toLowerCase()
        },
        locale: Em.I18n.currentLocale,
        document_type: 'Document::IdManual',
        taxon_name: params.scientific_name,
      }, params)
    );
  },

  didInsertElement: function() {
    var config = $.extend({
        onComplete: function() {
          setTimeout(function() {
            var list = $('.downloads-list:visible');

            if (list.find('li').length > 2) {
              list.jScrollPane({
                verticalDragMinHeight: 20
              });
            }
          }, 500);
        }
      },
      Checklist.CONFIG.colorbox
    );

    $("#generating-downloads-btn").colorbox(config);
    $("#complete-download-btn").colorbox(config);
    $("#failed-download-btn").colorbox(config);

    this.$().find('a').each(function(index, item) {
      $(item).colorbox(config);
    });
  }
});
