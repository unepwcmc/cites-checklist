//TODO change this to extend ObjectController
Checklist.TaxonConceptController = Ember.ArrayController.extend({
  content: Checklist.store.find(Checklist.Index, {}),

  contentIds: function(){
    return this.get('content').objectAt(0).get('contentIds');
  }.property('content'),
  contentHistory: null,
  contentDidChange: function(){
    if (this.get('content.isLoaded')){
      this.set('contentHistory',
        Checklist.store.findMany(Checklist.TimelinesForTaxonConcept, this.get('contentIds'))
      );
    }
  }.observes('content.isLoaded','contentIds'),

  refresh: function(params) {
    this.set('content', Checklist.store.find(
      Checklist.Index,
      params
    ));
  }
});
