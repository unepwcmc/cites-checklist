//TODO change this to extend ObjectController
Checklist.TaxonConceptController = Ember.ArrayController.extend({
  content: null,
  contentHistory: null,
  contentDidChange: function(){
    if (this.get('content.isLoaded')){
      this.set('contentHistory',
        Checklist.store.findMany(
          Checklist.TimelinesForTaxonConcept,
          this.get('content').objectAt(0).get('contentIds')
        )
      );
    }
  }.observes('content.isLoaded','contentIds')
});
