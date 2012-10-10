Checklist.TaxonConceptHistoryView = Em.View.extend({
  tagName: 'div',
  classNames: ['area'],
  templateName: "taxon_concept_history_view",
  content: null,
  contextBinding: 'content',
  totalWidthInPixels: 700,
  didInsertElement: function() {
    Ember.run.next(this, function(){
     // code to be executed in the next RunLoop, which will be scheduled after the current one
     this.set('totalWidthInPixels', $('.column').width());
    });
  },
  leftOffsetInPixels: 50,
  yearsOnTimescale: function(){
    return [1975,1985,1995,2005,2015];
  }.property(),

  expandCountryTimeline: function(event) {
    $(event.target).closest('a').siblings('.country-timelines').stop().slideToggle();
  }
});
