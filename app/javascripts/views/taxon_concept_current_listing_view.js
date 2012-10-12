Checklist.TaxonConceptCurrentListingView = Ember.View.extend({
  tagName: 'a',
  classNames: ['icons-link'],
  templateName: "taxon_concept_current_listing_view",
  currentListingParts: function(){
    var listing = this.get('context').get('current_listing');
    if (listing === null){
      return [];
    }
    return listing.split('/').map(function(appendix){
      switch (appendix) {
        case 'I':
          return {colour: "blue", symbol: 'I'};
        case 'II':
          return {colour: "green", symbol: 'II'};
        case 'III':
          return {colour: "orange", symbol: 'III'};
        case 'NC':
          return {colour: "grey", symbol: 'NC'};
      }
    });
  }.property(),
  attributeBindings: ['href'],
  href: function(){
    return '#current-listing-popup' + this.get('content.id');
  }.property(),
  didInsertElement: function(){
    this.$().colorbox(Checklist.Helpers.colorboxSettings);
  }
});

Checklist.TaxonConceptCurrentListingChangesListView = Ember.CollectionView.extend({
  content: null,
  itemViewClass: Ember.View.extend({
    tagName: 'div',
    templateName: 'taxon_concept_listing_change_view',
    contextBinding: 'content',
    sectionTitle: function(){
      return this.get('content.species_listing_name') + " · " +
      (this.get('content.hasParty') ? (this.get('content.party.iso_code2') + " · ") : '') +
      this.get('content.effective_at');
    }.property()
  })
});
