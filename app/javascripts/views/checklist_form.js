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

  valueChanged: function(event) {
    var params = {
      param_name: 'scientific_name',
      value: event.value,
      per_page: 4
    };

    var url = window.BACKEND_URL + 'taxon_concepts';

    if ($('.typeahead').length <= 0) {
      $('#scientific_name').typeahead({source: {url: url, params: params}, parser: this.species_parser});
    }
  }.observes('value'),

  species_parser: function(data) {
    var content = data[0].taxon_concepts;

    // Extract the names of each result row for use by typeahead.js
    content.forEach(function(item,i) {
      content[i] = content[i].full_name;
    });

    return content;
  }
});
