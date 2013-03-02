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

    // Unfortunately we have to use a global for our form elements
    // object so that we can repaint it later. An ideal solution would
    // be to bind to the change event for the checkbox and repaint on
    // that, but ember doesn't propagate the change event when it updates
    // checkbox bindings.
    Checklist.CFE = new CustomFormElements({
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
    this.get('controller').set(this.get('context'), this.get('checked'));

    var router = Checklist.get('router');
    var filtersController = router.get('filtersController');

    var params = filtersController.toParams();
    router.transitionTo('search', {redraw: false, params: $.param(params)});
  }
});

Checklist.UnfoldHistoryCheckbox = Ember.Checkbox.extend({
  change: function(){
    if (this.get('checked')) {
      $('.opener').each(function(index, item) { item.click(); });
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
  }, {
    name: 'Appendix',
    value: 'appendix',
  }],

  itemViewClass: Ember.View.extend({
    classNames: ['row'],

    contextBinding: 'content',
    templateName: 'sorting_radio_button',

    grouping: function() {
      return this.get('parentView').get('grouping');
    }.property(),

    isChecked: function() {
      var controller = this.get('controller');

      switch (this.get('context').value) {
        case "alphabetical":
          return !controller.get('taxonomicLayout') &&
                 !controller.get('levelOfListing');
          break;
        case "taxonomic":
          return controller.get('taxonomicLayout') &&
                 !controller.get('levelOfListing');
          break;
        case "appendix":
          return controller.get('taxonomicLayout') &&
                 controller.get('levelOfListing');
          break;
      }
    }.property(),

    mouseUp: function(event) {
      var router = Checklist.get('router');
      var controller = this.get('controller');

      switch (this.get('context').value) {
        case "alphabetical":
          controller.set('taxonomicLayout', false);
          break;
        case "taxonomic":
          controller.set('taxonomicLayout', true);
          controller.set('levelOfListing', false);
          break;
        case "appendix":
          controller.set('taxonomicLayout', true);
          controller.set('levelOfListing', true);
          controller.set('showSynonyms', false);
          controller.set('showAuthor', false);
          controller.set('showEnglish', false);
          controller.set('showFrench', false);
          controller.set('showSpanish', false);
          break;
      }

      var params = controller.toParams();
      router.transitionTo('search', {redraw: false, params: $.param(params)});
    }
  })
});
