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

Checklist.SortingRadioButton = Ember.View.extend({
  isChecked: false,

  group: "radio_button",
  customId: "",
  className: "",

  value: '',
  title: '',

  classNames: ['ember-radio-button'],
  defaultTemplate: Ember.Handlebars.compile('<input type="radio" name="{{unbound view.group}}" value="{{unbound view.value}}" id="{{unbound view.customId}}" class="{{unbound view.className}}" /> <label for="{{unbound view.customId}}">{{unbound view.title}}</label>')
});
