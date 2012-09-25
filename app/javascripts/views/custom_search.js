Checklist.CustomSearch = Ember.View.extend({
  templateName: 'custom_search',
  didInsertElement: function(event) {
    this.$().children('.custom-holder').openClose({
      activeClass:'expanded',
      opener:'a.btn-custom',
      slider:'div.drop',
      effect:'none',
      animSpeed:500
    });

    var cf = new CustomFormElements({
      cssClass: 'styled'
    });
  }
});

Checklist.SortingCheckbox = Ember.Checkbox.extend({
  change: function(event) {
    var filtersController = Checklist.get('router').get('filtersController');

    filtersController.set(this.get('context'), this.get('checked'));

    var filters = filtersController.toParams();
    var params = $.param(filters);

    Checklist.get('router').transitionTo('search',{params: params});
  }
});

Checklist.LevelOfListingCheckbox = Ember.Checkbox.extend({
  change: function(event) {
    var filtersController = Checklist.get('router').get('filtersController');

    filtersController.set('levelOfListing', this.get('checked'));

    var filters = filtersController.toParams();
    var params = $.param(filters);

    Checklist.get('router').transitionTo('search',{params: params});
  }
});

Checklist.LevelOfListing = Ember.Checkbox.extend({
  change: function(event) {
    var filtersController = Checklist.get('router').get('filtersController');

    filtersController.set('levelOfListing', this.get('checked'));

    var filters = filtersController.toParams();
    var params = $.param(filters);

    Checklist.get('router').transitionTo('search',{params: params});
  }
});

Checklist.UnfoldHistoryCheckbox = Ember.Checkbox.extend({
  change: function(){
    if (this.get('checked')) {
      $('.listing-item').addClass('expanded');
      $('.opener-holder').fadeIn();
      $('.slide').slideDown();
    } else {
      $('.listing-item').removeClass('expanded');
      $('.opener-holder').fadeOut();
      $('.slide').slideUp();
    }
  }
});

Checklist.SortingRadioButtons = Ember.CollectionView.extend({
  tagName: 'div',

  grouping: Checklist.Helpers.generateId(),

  content: [{
    name: 'Alphabetical',
    value: 'alphabetical',
    isChecked: true
  }, {
    name: 'Taxonomic',
    value: 'taxonomic',
    isChecked: false
  }],

  itemViewClass: Ember.View.extend({
    classNames: ['row'],

    contextBinding: 'content',
    templateName: 'sorting_radio_button',

    grouping: function() {
      return this.get('parentView').get('grouping');
    }.property(),

    mouseUp: function(event) {
      var filtersController = Checklist.get('router').get('filtersController');
      filtersController.set('taxonomicLayout', (this.get('content').value != 'alphabetical'));

      var filters = Checklist.get('router').get('filtersController').toParams();
      var params = $.param(filters);

      Checklist.get('router').transitionTo('search',{params: params});
    }
  })
});
