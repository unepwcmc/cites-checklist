Checklist.TaxonConceptList = Ember.CollectionView.extend({
  tagName: 'ul',
  content: null,
  itemViewClass: Ember.View.extend({
    templateName: 'taxon_concept_view',
    showEnglish: function(){return content.hasLanguage('English') && true;},//TODO check for output customisation here
    showSpanish: function(){return content.hasLanguage('Spanish') && true;},//TODO check for output customisation here
    showFrench: function(){return content.hasLanguage('French') && true;}//TODO check for output customisation here
  })
});
