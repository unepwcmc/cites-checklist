Checklist.ChecklistForm = Em.View.extend({
  tagName: 'form',
  controller: null,
  filtersController: null,

  templateName: "checklist_form",

  submit: function(event) {
    event.preventDefault();

    this.get('filtersController').set('page', 0);

    var filters = this.get('filtersController').toParams();
    var params = $.param(filters);

    var taxonConceptController = Checklist.get('router').get('taxonConceptController');
    var params = Checklist.get('router').get('filtersController').toParams()
    taxonConceptController.refresh(params);
  }

});

/*
 * An extended TextField for use in scientific name search.
 *
 * Handles text change events and creates an autocomplete box for the text.
 */
Checklist.SearchTextField = Em.TextField.extend({
  value: '',

  attributeBindings: ['autocomplete'],

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
          updater: this.updater,
          menu: '<div class="drop-holder"><div class="scroll-area"> <ul> </ul> </div> </div>',
          location: '#autocomplete-dropdown'
        }
      );
    }

    this.$().attr('placeholder', '');
  },

  focusOut: function(event) {
    this.$().attr('placeholder', this.get('placeholder'));
  },

  updater: function(item) {
    // Remove synonyms when an item is selected
    return item.replace(/(.*)( \(\=.*\))/, "$1");
  },

  highlighter: function(item) {
    var query = this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&');
    var transform = function ($1, match) {
      return '<span style="text-decoration:underline">' + match + '</span>';
    };
    return item.
    replace(new RegExp('^(' + query + ')', 'i'), transform).
    replace(new RegExp('[ =](' + query + ')', 'ig'), transform);
  },

  parser: function(data) {
    var content = data;
    var results = {};

    // Extract the names of each result row for use by typeahead.js
    content.forEach(function(item,i) {
      if (!(item.rank_name in results)) {
        results[item.rank_name] = [];
      }

      var entry = item.full_name;
      if (item.synonyms.length > 0) {
        entry += " (=" + item.synonyms.join(", ") + ")";
      }
      results[item.rank_name].push(entry);
    });

    return results;
  }
});

/*
 * An extended TextField for use in location search.
 *
 * Handles text change events and creates an autocomplete box for the text.
 */
Checklist.GeoEntityTextField = Em.TextField.extend({
  value: '',

  attributeBindings: ['autocomplete'],

  click: function() {
    this.$().attr('placeholder', '');
  },

  focusOut: function(event) {
    this.$().attr('placeholder', this.get('placeholder'));
  },

  keyUp: function(event) {
    var controller = Checklist.get('router').get('filtersController');
    var pattern = new RegExp("^"+event.currentTarget.value,"i");
    controller.set(
      'autoCompleteCountriesContent',
      controller.get('countriesContent').filter(
        function(item, index, enumerable){
          return (pattern.test(item.get('name')));
        }
      )
    );

    pattern = new RegExp("^[0-9]- "+event.currentTarget.value,"i");
    controller.set(
      'autoCompleteRegionsContent',
      controller.get('regionsContent').filter(
        function(item, index, enumerable){
          return (pattern.test(item.get('name')));
        }
      )
    );
  }
});
