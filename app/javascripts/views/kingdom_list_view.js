Checklist.KingdomListView = Ember.View.extend({
  templateName: 'kingdom_list_view',
  content: null,
  showAnimalia: function(){
    debugger;
    return this.content.get('animalia_present');
  }.property(),
  plantaePresent: function(){
    return this.content.get('plantae_present');
  }.property()
});
