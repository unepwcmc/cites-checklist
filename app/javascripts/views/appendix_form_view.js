Handlebars.registerHelper('appendixColour', function(property, options) {
  var value = Ember.Handlebars.getPath(this, property, options);

  switch(value) {
    case "I":
      return "blue";
    case "II":
      return "green";
    case "III":
      return "orange";
  }

  return "";
});

Checklist.AppendixFormView = Ember.CollectionView.extend({
  tagName: 'ul',
  content: [],
  itemViewClass: Ember.View.extend({
    contextBinding: 'content',
    templateName: 'appendix_form',
    click: function(event) {
      $(event.target).toggleClass('inactive');
    }
  }),
});
