Checklist.TaxonConceptController = Ember.ArrayController.extend({
  content: [],

  taxaCount: 0,

  contentIds: function(){
    return this.get('content').objectAt(0).get('contentIds');
  }.property('content'),

  contentDidChange: function(){
    if (this.get('content.isLoaded')){
      this.set('taxaCount', this.get('content').objectAt(0).get('total_cnt'));
      Checklist.store.find(
        Checklist.TimelinesForTaxonConcept, {
          taxon_concept_ids: this.get('contentIds'), locale: Em.I18n.currentLocale
        }
      );
    }
  }.observes('content.@each.isLoaded','contentIds'),

  refresh: function(params) {
    this.set('content', Checklist.store.find(
      Checklist.Index,
      $.extend({locale: Em.I18n.currentLocale}, params)
    ));
  }
});
