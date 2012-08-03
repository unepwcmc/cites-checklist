Checklist.TaxonConceptListView = Ember.CollectionView.extend({
  tagName: 'ul',
  content: null,
  itemViewClass: Ember.View.extend({
    contextBinding: 'content',
    templateName: 'taxon_concept_view',
    classNameBindings: ['level', 'rank'],
    level: function(){
      if(Checklist.get('router').get('filtersController').taxonomicLayout){ 
        return 'taxon-level' + this.content.get('depth');
      }
    }.property(),
    rank: function(){
      return this.content.get('rank_name').toLowerCase() + '-taxon';
    }.property(),
    showEnglish: function(){return this.content.get('english').length > 0}.property(),
    showSpanish: function(){return this.content.get('spanish').length > 0}.property(),
    showFrench: function(){return this.content.get('french').length > 0}.property(),
    showSynonyms: function(){return this.content.get('synonyms').length > 0}.property(),
    showListing: function(){return this.content.get('rank_name') != 'KINGDOM' &&
      this.content.get('rank_name') != 'PHYLUM' &&
      this.content.get('rank_name') != 'CLASS'}.property()
  })
});
