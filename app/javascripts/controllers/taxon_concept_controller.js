//TODO change this to extend ObjectController
Checklist.TaxonConceptController = Ember.ArrayController.extend({
  content: null,
  contentIds: function(){
    return this.get('content').objectAt(0).get('taxon_concepts').mapProperty('id');
  }.property('content'),
  contentHistory: null,
  contentDidChange: function(){
    if (this.get('content.isLoaded')){
      this.set('contentHistory',
        Checklist.store.findMany(Checklist.TimelinesForTaxonConcept, this.get('contentIds'))
      );
    }
  }.observes('content.isLoaded','contentIds')
});
