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
      var filtersController = Checklist.get('router').get('filtersController');

      // Add the selected appendice to the appendice filter array
      // Equivalent to a selectionBinding in a dropdown list
      appendices = filtersController.get('appendices');
      if (!appendices.contains(this.get('context'))) {
        appendices.push(this.get('context'))
      }

      $(event.target).parent().toggleClass('inactive');
    }
  }),
});
