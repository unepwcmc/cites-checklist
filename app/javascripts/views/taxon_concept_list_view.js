Checklist.TaxonConceptListView = Ember.CollectionView.extend({
  tagName: 'ul',
  content: null,
  itemViewClass: Ember.View.extend({
    contextBinding: 'content',
    templateName: 'taxon_concept_view',
    classNameBindings: ['level', 'rank'],
    level: function(){
      if(Checklist.selectedFiltersController.taxonomicLayout){ 
        return 'taxon-level' + this.content.get('depth');
      }
    }.property(),
    rank: function(){
      return this.content.get('rank_name').toLowerCase() + '-taxon';
    }.property(),
    showEnglish: function(){return this.content.get('english').length > 0}.property(),
    showSpanish: function(){return this.content.get('spanish').length > 0}.property(),
    showFrench: function(){return this.content.get('french').length > 0}.property(),
  })
});
