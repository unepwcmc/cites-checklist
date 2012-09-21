Checklist.TaxonConceptCommonNameView = Ember.CollectionView.extend({
  content: null,
  tagName: 'ul',

  itemViewClass: Ember.View.extend({
    classNames: ['common-name'],
    contextBinding: 'content',

    template: Ember.Handlebars.compile("{{this}}")
  })
});

Checklist.TaxonConceptListView = Ember.CollectionView.extend({
  content: null,
  filtersController: null,
  itemViewClass: Ember.View.extend({
    tagName: 'div',
    contextBinding: 'content',
    templateName: 'taxon_concept_view',

    //TODO could the filters controller be passed here and used instead of router call
    filtersController: function(){
      return Checklist.get('router').get('filtersController');
    }.property(),

    classNames: ['listing-item'],
    classNameBindings: ['rank'],
    rank: function(){
      // Hide this item if we're using alphabetical view and this item
      // is a taxa bar
      if (this.get('isHigherTaxa') && !this.get('showHigherTaxaBar')) {
        return "hidden";
      }

      var classes = [];

      if (this.get('isHigherTaxa') && this.get('showHigherTaxaBar')) {
        classes.push("persist-area");
        classes.push("persist-header");
        classes.push("main-heading");
      } else {
        classes.push("block");
      }

      classes.push(this.content.get('rank_name').toLowerCase() + '-taxon');

      return classes.join(" ");
    }.property(),

    headingStyle: function() {
      var style = "";

      if (this.content.get('cites_accepted')) {
        style += "font-weight:normal;";
      }

      switch(this.content.get('rank_name')) {
        case "FAMILY":
        case "ORDER":
          style += "text-transform:uppercase;font-style:normal;";
          break;
      }

      return style;
    }.property(),

    full_name: function() {
      var full_name = this.content.get('full_name');

      switch (this.content.get('rank_name')) {
        case "FAMILY":
        case "GENUS":
          full_name += " <span style='text-transform: lowercase; font-style: normal'>spp.</span>";
          break;
      }

      return full_name;
    }.property('full_name'),
    english: function() {
      return this.content.get('english').split(',');
    }.property('english'),
    spanish: function() {
      return this.content.get('spanish').split(',');
    }.property('spanish'),
    french: function() {
      return this.content.get('french').split(',');
    }.property('french'),

    showEnglish: function(){
      return this.get('filtersController').showEnglish &&
        this.content.get('english').length > 0;
    }.property(),
    showSpanish: function(){
      return this.get('filtersController').showSpanish &&
        this.content.get('spanish').length > 0;
    }.property(),
    showFrench: function(){
      return this.get('filtersController').showFrench &&
        this.content.get('french').length > 0;
    }.property(),
    showSynonyms: function(){
      return this.get('filtersController').showSynonyms &&
        this.content.get('synonyms').length > 0;
    }.property(),
    showListing: function(){return this.content.get('rank_name') != 'KINGDOM' &&
      this.content.get('rank_name') != 'PHYLUM' &&
      this.content.get('rank_name') != 'CLASS';
    }.property(),

    isHigherTaxa: function(){
      return this.content.get('itemType') == 'HigherTaxa';
    }.property(),
    showHigherTaxaBar: function(){
      return this.get('filtersController').taxonomicLayout &&
        this.get('isHigherTaxa');

    }.property(),

    currentListingParts: function(){
      var listing = this.get('context').get('current_listing');
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

    click: function(event) {
      // Ignore clicks on the history graph
      if ($(event.target).parents('.slide').length > 0) return;

      this.$().toggleClass('expanded');
      this.$().find('.slide').slideToggle();
    },

    didInsertElement: function() {
      $('.new-taxa').hoverTooltip({
        positionTypeX: 'left',
        positionTypeY: 'top',
        attribute:'title',
        extraOffsetX: -2,
        extraOffsetY: 2,
        tooltipStructure:
        '<div class="new-tooltip"><div class="tooltip-text">Recently Added</div>' +
        '<div class="tooltip-decor"></div></div>'
      });
    }
  })
});

Checklist.CountryListingView = Ember.View.extend({
  content: [],

  templateName: 'countries_list',

  shortText: function() {
    var countries = this.get('content');

    var visible_countries = [];

    countries.forEach(function(item, index, enumerable) {
      if (index >= 3) return;

      visible_countries.push(item.get('name'));
    });

    return visible_countries.join(", ");
  }.property(),

  fullText: function() {
    return this.content.mapProperty('name');
  }.property(),

  count: function() {
    return this.content.get('length');
  }.property()
});
