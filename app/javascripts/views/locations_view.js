Checklist.LocationsView = Ember.View.extend({
  templateName: "location_view",

  buttonString: function() {
    var filtersController = Checklist.get('router').get('filtersController');

    var regions_count   = filtersController.get('regionsIds').get('length');
    var countries_count = filtersController.get('countriesIds').get('length');

    var locations_count = regions_count + countries_count;

    if (locations_count === 0) {
      return "All Locations";
    } else {
      return locations_count + " location" + (locations_count > 1 ? "s" : "");
    }
  }.property()
});

Checklist.SelectedLocationsView = Ember.CollectionView.extend({
  tagName: 'ul',
  content: null,
  filtersController: null,

  locationType: null,

  itemViewClass: Ember.View.extend({
    contextBinding: 'content',
    templateName: 'selected_locations_collection',

    delete_location: function(event) {
      var location_type = this.get('parentView').get('locationType');

      var router = Checklist.get('router');
      var filtersController = router.get('filtersController');

      filtersController.get(location_type).removeObject(this.get('context'));

      var filters = filtersController.toParams();
      var params = $.param(filters);

      var taxonConceptController = router.get('taxonConceptController');
      taxonConceptController.refresh(filtersController.toParams());
    }
  })
});

Checklist.LocationsCollectionView = Ember.CollectionView.extend({
  tagName: 'ul',
  content: null,
  filtersController: null,

  locationType: null,

  emptyView: Ember.View.extend({
    template: Ember.Handlebars.compile("No matches")
  }),

  itemViewClass: Ember.View.extend({
    contextBinding: 'content',
    templateName: 'locations_collection',

    click: function(event) {
      var location_type = this.get('parentView').get('locationType');

      var router = Checklist.get('router');
      var filtersController = router.get('filtersController');

      filtersController.get(location_type).addObject(this.get('context'));

      var filters = filtersController.toParams();
      var params = $.param(filters);

      var taxonConceptController = router.get('taxonConceptController');
      taxonConceptController.refresh(filtersController.toParams());
    },

    didInsertElement: function(event) {
      // Wait until all elements are rendered to render scroll bar
      if (this.get('context') == this.get('parentView').get('content').get('lastObject')) {
        var scroll_area = this.$().parents('.scroll-area');

        scroll_area.jScrollPane({
          verticalDragMinHeight: 20
        });
      }
    }
  })
});
