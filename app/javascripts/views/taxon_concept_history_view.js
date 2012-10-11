Checklist.TaxonConceptHistoryView = Em.View.extend({
  tagName: 'div',
  classNames: ['area'],
  templateName: "taxon_concept_history_view",

  contextBinding: 'content',

  totalWidthInPixels: 700,
  leftOffsetInPixels: 50,
  rightOffsetInPixels: 5,

  didInsertElement: function() {
    var that = this;
    $(window).resize(function() {
      if (!that.isDestroyed) {
        that.setWidth();
      }
    });

    Ember.run.next(this, function(){
      this.setWidth();
    });
  },
  setWidth: function(width) {
    this.set('totalWidthInPixels', width || $('.column').width());
  },

  expandCountryTimeline: function(event) {
    $(event.target).closest('a').siblings('.country-timelines').stop().slideToggle();
  }
});
