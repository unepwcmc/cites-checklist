Checklist.TaxonConceptController = Ember.ArrayController.extend({
  refresh: function(params){
    var that = this;
    var promise = new RSVP.Promise();
    var res = Checklist.store.find(
      Checklist.Index,
      $.extend({locale: Em.I18n.currentLocale}, params)
    );
    res.addObserver(
      '@each.didLoad',
      function(){
        Ember.run.once(
          this,
          function() { promise.resolve(res); }
        );
       }
    );
    promise.then(function(taxon_concepts_index_ary){
      that.set('content', taxon_concepts_index_ary);
      var contentIds = taxon_concepts_index_ary.objectAt(0).get('contentIds');
      Checklist.store.find(
        Checklist.TimelinesForTaxonConcept, {
          taxon_concept_ids: contentIds, locale: Em.I18n.currentLocale
        }
      );
    });
  }
});
