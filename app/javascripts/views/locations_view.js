Checklist.SelectedLocationsView = Ember.CollectionView.extend({
  tagName: 'ul',
  content: null,
  filtersController: null,

  locationType: null,

  itemViewClass: Ember.View.extend({
    contextBinding: 'content',
    templateName: 'selected_locations_collection',

    delete: function(location_type, event) {
      var location_type = this.get('parentView').get('locationType');
      var filtersController = Checklist.get('router').get('filtersController');

      filtersController.get(location_type).removeObject(this.get('context'));

      var filters = filtersController.toParams();
      var params = $.param(filters);

      Checklist.get('router').transitionTo('search',{params: params});
    }
  })
});

Checklist.LocationsView = Ember.CollectionView.extend({
  tagName: 'ul',
  content: null,
  filtersController: null,

  locationType: null,

  itemViewClass: Ember.View.extend({
    contextBinding: 'content',
    templateName: 'locations_collection',

    click: function(event) {
      var location_type = this.get('parentView').get('locationType');
      var filtersController = Checklist.get('router').get('filtersController');

      filtersController.get(location_type).addObject(this.get('context'));

      var filters = filtersController.toParams();
      var params = $.param(filters);

      Checklist.get('router').transitionTo('search',{params: params});
    },

    didInsertElement: function(event) {
      var scroll_area = this.$().parents('.scroll-area');

      if (!scroll_area.hasClass('jspScrollable')) {
        scroll_area.jScrollPane({
          verticalDragMinHeight: 20,
        });
      }
    },
  })
});
