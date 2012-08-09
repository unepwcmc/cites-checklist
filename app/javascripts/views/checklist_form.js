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

Checklist.SearchTextField = Em.TextField.extend({
  click: function() {
    // Boot up Twitter Bootstrap Typeahead if it's not already
    // initialised
    if ($('.typeahead').length <= 0) {
      $('#scientific_name').typeahead();
    }
  }
});
