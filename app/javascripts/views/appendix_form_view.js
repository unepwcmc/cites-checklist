Checklist.AppendixFormView = Ember.View.extend({
  content: [],
  templateName: 'appendix_form',

  summary: function() {
    var appendices = this.get('content').mapProperty('abbreviation');
    if (appendices.length === 0 || appendices.length == 3) {
      return "All Appxs.";
    } else {
      return appendices.sort().join(", ");
    }
  }.property("@each"),
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

      if ($.inArray(abbreviation, selected_appendices) < 0) {
        classes.push("inactive");
      }

      return classes.join(" ");
    }.property().volatile(),

    click: function(event) {
      // The click event fires for list items as well as circles,
      // this is a bit of a hacky method of ignoring list item clicks
      if ($(event.target).not('div').length > 0) return;

      var router = Checklist.get('router');
      var filtersController = router.get('filtersController');

      // Add the selected appendice to the appendice filter array
      // Equivalent to a selectionBinding in a dropdown list
      appendices = filtersController.get('appendices');
      if (appendices.contains(this.get('context'))) {
        appendices.removeObject(this.get('context'));
      } else {
        appendices.addObject(this.get('context'));
      }

      $(event.target).parent().toggleClass('inactive');

      var taxonConceptController = router.get('taxonConceptController');
      taxonConceptController.refresh(filtersController.toParams());

      this.get('parentView').get('parentView').set('summary', '');
    }
  })
});
