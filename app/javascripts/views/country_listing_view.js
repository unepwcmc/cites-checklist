Checklist.CountryListingView = Ember.View.extend({
  content: [],

  templateName: 'countries_list',

  touchEnd: function(e) {
    if ($(e.target).is('a.btn-saved')) {
      var $drop = this.$('.drop');
      if ($drop.has($(e.target)).length === 0) {
        $drop.toggleClass('show');
      }
    }
  },

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
