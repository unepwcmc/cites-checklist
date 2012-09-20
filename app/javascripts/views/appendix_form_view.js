Checklist.AppendixFormView = Ember.View.extend({
  content: [],
  templateName: 'appendix_form',

  summary: function() {
    var appendices = Checklist.get('router').get('filtersController').get('appendicesIds');
    if (appendices.length === 0 || appendices.length == 3) {
      return "All Appxs.";
    } else {
      return appendices.join(", ");
    }
  }.property("@each")
});

Checklist.AppendixFormCollectionView = Ember.CollectionView.extend({
  tagName: 'ul',
  content: [],
  itemViewClass: Ember.View.extend({
    contextBinding: 'content',
    templateName: 'appendix_form_collection',

    classNameBindings: ['classes'],
    classes: function() {
      var filtersController = Checklist.get('router').get('filtersController');
      var abbreviation      = this.get('context').get('abbreviation');

      var classes = [];

      switch(abbreviation) {
        case "I":
          classes.push("blue");
          break;
        case "II":
          classes.push("green");
          break;
        case "III":
          classes.push("orange");
          break;
      }

      var selected_appendices = filtersController.get('appendices').mapProperty('abbreviation');

      // If the selected appendices array is blank, then all appendices
      // are active
      if (selected_appendices.length > 0) {
        if ($.inArray(abbreviation, selected_appendices) < 0) {
          classes.push("inactive");
        }
      }

      return classes.join(" ");
    }.property().volatile(),

    click: function(event) {
      // The click event fires for list items as well as circles,
      // this is a bit of a hacky method of ignoring list item clicks
      if ($(event.target).not('div').length > 0) return;

      var filtersController = Checklist.get('router').get('filtersController');

      // Add the selected appendice to the appendice filter array
      // Equivalent to a selectionBinding in a dropdown list
      appendices = filtersController.get('appendices');
      if (appendices.length > 0) {
        if (appendices.contains(this.get('context'))) {
          filtersController.get('appendices').removeObject(this.get('context'));
        } else {
          filtersController.get('appendices').addObject(this.get('context'));
        }
      } else {
        // In the case that the appendices filter is empty, then we
        // assume no filter is set and all appendices are selected.
        // This means clicking on an appendices will in fact add all
        // appendices except that one to the list:
        var that = this;
        filtersController.get('appendicesContent').forEach(function(item, index, enumerable) {
          if (item != that.get('context')) {
            filtersController.get('appendices').addObject(item);
          }
        });
      }

      $(event.target).parent().toggleClass('inactive');

      var filters = filtersController.toParams();
      var params = $.param(filters);

      Checklist.get('router').transitionTo('search',{params: params});
    }
  })
});
