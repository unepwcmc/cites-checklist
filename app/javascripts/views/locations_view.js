Checklist.LocationsView = Ember.View.extend({
  templateName: "location_view",

  count: function() {
    var regions_count   = this.get('regions').get('length');
    var countries_count = this.get('countries').get('length');

    return regions_count + countries_count;
  }.property('regions','countries').volatile(),
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
      router.transitionTo('search', {redraw: false, params: $.param(params)});
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
      router.transitionTo('search', {redraw: false, params: $.param(params)});
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
