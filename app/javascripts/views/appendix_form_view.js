Checklist.AppendixFormView = Ember.CollectionView.extend({
  tagName: 'ul',
  content: [],
  itemViewClass: Ember.View.extend({
    contextBinding: 'content',
    templateName: 'appendix_form',

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

      if ($.inArray(abbreviation, filtersController.get('appendices').mapProperty('abbreviation')) < 0) {
        classes.push("inactive");
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
      if (appendices.contains(this.get('context'))) {
        filtersController.get('appendices').removeObject(this.get('context'));
      } else {
        filtersController.get('appendices').addObject(this.get('context'));
      }

      $(event.target).parent().toggleClass('inactive');

      var filters = filtersController.toParams();
      var params = $.param(filters);

      Checklist.get('router').transitionTo('search',{params: params});
    }
  }),
});
