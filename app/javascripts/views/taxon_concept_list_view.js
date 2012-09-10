Checklist.TaxonConceptListView = Ember.CollectionView.extend({
  content: null,
  filtersController: null,
  itemViewClass: Ember.View.extend({
    contextBinding: 'content',
    templateName: 'taxon_concept_view',
    classNames: ['listing-item'],
    classNameBindings: ['rank'],
    //TODO could the filters controller be passed here and used instead of router call
    filtersController: function(){
      return Checklist.get('router').get('filtersController')
    }.property(),
    rank: function(){
      var classes = [];

      if (this.get('isHigherTaxa')) {
        classes.push("persist-area");
        classes.push("persist-header");
        classes.push("main-heading");
      } else {
        classes.push("block");
      }

      classes.push(this.content.get('rank_name').toLowerCase() + '-taxon');

      return classes.join(" ");
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
    }.property(),
    isHigherTaxa: function(){
      return this.content.get('rank_name') == 'higher-taxa';
    }.property(),
    showHigherTaxaBar: function(){
      return this.get('filtersController').taxonomicLayout &&
        this.get('isHigherTaxa');
    }.property(),
    tagName: 'div',
    designationColour: function() {
      var appendix = this.get('context').get('current_listing');
      switch (appendix) {
        case 'I':
          return "blue";
        case 'II':
          return "green";
        case 'III':
          return "orange";
      }
    }.property(),

    mouseEnter: function(event) {
      if (!this.$().hasClass('expanded')) {
        this.$().children('.opener-holder').fadeIn();
      }
    },
    mouseLeave: function(event) {
      // If element has expanded classname, don't hide bottom border
      if (!this.$().hasClass('expanded')) {
        this.$().children('.opener-holder').fadeOut();
      }
    },
    click: function(event) {
      this.$().toggleClass('expanded');
      this.$().find('.slide').slideToggle();
    }
  }),
});
