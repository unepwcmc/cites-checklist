Checklist.LocationsView = Ember.View.extend({
  templateName: "location_view",

  buttonString: function() {
    var regions_count   = this.get('regions').get('length');
    var countries_count = this.get('countries').get('length');

    var locations_count = regions_count + countries_count;

    if (locations_count === 0) {
      return "All Locations";
    } else {
      return locations_count + " location" + (locations_count > 1 ? "s" : "");
    }
  }.property("@each")
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

      var params = filtersController.toParams();
      router.transitionTo('search_without_render', {params: $.param(params)});

      this.get('parentView').get('parentView').set('buttonString', '');
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

      var params = filtersController.toParams();
      router.transitionTo('search_without_render', {params: $.param(params)});

      this.get('parentView').get('parentView').set('buttonString', '');
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
