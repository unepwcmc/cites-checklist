Checklist.KingdomListView = Ember.View.extend({
  templateName: 'kingdom_list_view',
  content: null,
  showAnimalia: function(){
    return this.content.get('animaliaPresent');
  }.property(),
  plantaePresent: function(){
    return this.content.get('plantaePresent');
  }.property()
});
