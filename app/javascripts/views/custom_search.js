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

/*
 * A generic checkbox extension that sets a boolean filter in the
 * FiltersController.
 *
 * Pass a 'context' binding equal to the name of the filter, such as
 * 'showSynonyms'
 */
Checklist.FilterCheckbox = Ember.Checkbox.extend({
  change: function(event) {
    var router = Checklist.get('router');
    var filtersController = router.get('filtersController');

    filtersController.set(this.get('context'), this.get('checked'));

    var filters = filtersController.toParams();
    var params = $.param(filters);

    var taxonConceptController = router.get('taxonConceptController');
    taxonConceptController.refresh(filtersController.toParams());
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
  }, {
    name: 'Taxonomic',
    value: 'taxonomic',
  }],

  itemViewClass: Ember.View.extend({
    classNames: ['row'],

    contextBinding: 'content',
    templateName: 'sorting_radio_button',

    grouping: function() {
      return this.get('parentView').get('grouping');
    }.property(),

    isChecked: function() {
      var layout = Checklist.get('router').get('filtersController').get('taxonomicLayout');

      if (this.get('context').value == 'alphabetical') {
        return !layout;
      } else {
        return layout;
      }
    }.property(),

    mouseUp: function(event) {
      var router = Checklist.get('router');
      var filtersController = router.get('filtersController');

      filtersController.set('taxonomicLayout', (this.get('content').value != 'alphabetical'));

      var filters = Checklist.get('router').get('filtersController').toParams();
      var params = $.param(filters);

      var taxonConceptController = router.get('taxonConceptController');
      taxonConceptController.refresh(filtersController.toParams());
    }
  })
});
