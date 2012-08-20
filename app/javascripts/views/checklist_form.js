Checklist.ChecklistForm = Em.View.extend({
  tagName: 'form',
  controller: null,
  filtersController: null,
  countryFilter: null,
  regionFilter: null,
  taxonomicLayoutSwitch: null,

  submit: function(event) {
    event.preventDefault();

    this.get('filtersController').set('page', 0);

    Checklist.get('router').get('savedSearchController').set('selection', null);

    var filters = this.get('filtersController').toParams();
    var params = $.param(filters);

    Checklist.get('router').transitionTo('search',{params: params});
  },

});

/*
 * An extended TextField for use in scientific name search.
 *
 * Handles text change events and creates an autocomplete box for the text.
 */
Checklist.SearchTextField = Em.TextField.extend({
  value: '',

  click: function(event) {
    var params = {
      param_name: 'scientific_name',
      value: event.value,
      per_page: 10
    };

    var url = window.BACKEND_URL + 'taxon_concepts/autocomplete';

    if ($('.typeahead').length <= 0) {
      $('#scientific_name').typeahead(
        {
          source: {url: url, params: params},
          parser: this.parser,
          highlighter: this.highlighter,
          updater: this.updater
        }
      );
    }
  },

  updater: function(item) {
    // Remove synonyms when an item is selected
    return item.replace(/(.*)( \(\=.*\))/, "$1");
  },

  highlighter: function(item) {
    var query = this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&')
    var transform = function ($1, match) {
      return '<strong>' + match + '</strong>'
    }
    return item.
    replace(new RegExp('^(' + query + ')', 'i'), transform).
    replace(new RegExp('[ =](' + query + ')', 'ig'), transform)
  },

  parser: function(data) {
    var content = data;
    var results = {}

    // Extract the names of each result row for use by typeahead.js
    content.forEach(function(item,i) {
      if (!(item.rank_name in results)) {
        results[item.rank_name] = [];
      }

      var entry = item.full_name;
      if (item.synonyms !== '') {
        entry += " (=" + item.synonyms + ")";
      }
      results[item.rank_name].push(entry);
    });

    return results;
  }
});
