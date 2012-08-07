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
  }

});
