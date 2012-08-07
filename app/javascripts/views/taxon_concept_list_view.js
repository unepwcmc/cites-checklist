Checklist.TaxonConceptListView = Ember.CollectionView.extend({
  tagName: 'ul',
  content: null,
  filtersController: null,
  itemViewClass: Ember.View.extend({
    contextBinding: 'content',
    templateName: 'taxon_concept_view',
    classNameBindings: ['level', 'rank'],
    //TODO could the filters controller be passed here and used instead of router call
    filtersController: function(){
      return Checklist.get('router').get('filtersController')
    }.property(),
    level: function(){
      if(this.get('filtersController').taxonomicLayout){ 
        return 'taxon-level' + this.content.get('depth');
      }
    }.property(),
    rank: function(){
      return this.content.get('rank_name').toLowerCase() + '-taxon';
    }.property(),
    showEnglish: function(){
      return this.get('filtersController').showEnglish &&
        this.content.get('english').length > 0
    }.property(),
    showSpanish: function(){
      return this.get('filtersController').showSpanish &&
        this.content.get('spanish').length > 0
    }.property(),
    showFrench: function(){
      return this.get('filtersController').showFrench &&
        this.content.get('french').length > 0
    }.property(),
    showSynonyms: function(){
      return this.get('filtersController').showSynonyms &&
        this.content.get('synonyms').length > 0
    }.property(),
    showListing: function(){return this.content.get('rank_name') != 'KINGDOM' &&
      this.content.get('rank_name') != 'PHYLUM' &&
      this.content.get('rank_name') != 'CLASS'
    }.property()
  })
});
