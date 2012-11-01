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
    this.get('controller').set(this.get('context'), this.get('checked'));

    var router = Checklist.get('router');
    var filtersController = router.get('filtersController');

    var params = filtersController.toParams();
    router.transitionTo('search_without_render', {params: $.param(params)});
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
          return !controller.get('taxonomicLayout');
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
          break;
      }

      var params = controller.toParams();
      router.transitionTo('search_without_render', {params: $.param(params)});
    }
  })
});
