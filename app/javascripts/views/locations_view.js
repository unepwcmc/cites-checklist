Checklist.SelectedLocationsView = Ember.CollectionView.extend({
  tagName: 'ul',
  content: null,
  filtersController: null,
  itemViewClass: Ember.View.extend({
    contextBinding: 'content',
    templateName: 'selected_locations_collection',
  })
});

Checklist.LocationView = Ember.View.extend({
  contextBinding: 'content',
  templateName: 'locations_collection',

  click_location: function(location_type, event) {
    var filtersController = Checklist.get('router').get('filtersController');

    var location = filtersController.get(location_type);
    if (!location.contains(this.get('context'))) {
      location.push(this.get('context'))
    }

    filtersController.set(location_type, location);
  }
});

Checklist.CountriesCollectionView = Ember.CollectionView.extend({
  tagName: 'ul',
  content: null,
  filtersController: null,
  itemViewClass: Checklist.LocationView.extend({
    click: function(event) {
      this.click_location('countries', event);
    }
  })
});

Checklist.RegionsCollectionView = Ember.CollectionView.extend({
  tagName: 'ul',
  content: null,
  filtersController: null,
  itemViewClass: Checklist.LocationView.extend({
    click: function(event) {
      this.click_location('regions', event);
    }
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
