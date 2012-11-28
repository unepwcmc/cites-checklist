Checklist.CountryListingView = Ember.View.extend({
  content: [],

  templateName: 'countries_list',

  shortList: function(){
    return this.get('content').slice(0,6);
  }.property(),

  showMore: function() {
    return this.get('count') > 0;
  }.property(),

  count: function() {
    return this.content.get('length') - 6;
  }.property()
});
