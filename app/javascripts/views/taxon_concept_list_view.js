Checklist.TaxonConceptList = Ember.CollectionView.extend({
  tagName: 'ul',
  content: null,
  itemViewClass: Ember.View.extend({
    templateName: 'taxon_concept_view',
    showEnglish: function(){return this.content.get('english').length > 0}.property(),
    showSpanish: function(){return this.content.get('spanish').length > 0}.property(),
    showFrench: function(){return this.content.get('french').length > 0}.property(),
  })
});
