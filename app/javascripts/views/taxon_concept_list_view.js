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
          full_name += " spp.";
          break;
      }

      return full_name;
    }.property('full_name'),

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
      return this.content.get('rank_name') == 'higher-taxa';
    }.property(),
    showHigherTaxaBar: function(){
      return this.get('filtersController').taxonomicLayout &&
        this.get('isHigherTaxa');

    }.property(),

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

    click: function(event) {
      this.$().toggleClass('expanded');
      this.$().find('.slide').slideToggle();
    }
  })
});

Checklist.CountryListingView = Ember.View.extend({
  content: [],

  defaultTemplate: Ember.Handlebars.compile('{{{unbound view.countriesDisplay}}}'),

  countriesDisplay: function() {
    var countries = this.get('content');

    var visible_countries = [];
    var hidden_countries  = [];

    countries.forEach(function(item, index, enumerable) {
      if (index >= 3) {
        hidden_countries.push(item);
      } else {
        visible_countries.push(item);
      }
    });

    hidden_countries = hidden_countries.mapProperty('name');
    visible_countries = visible_countries.mapProperty('name');

    var display_string = [visible_countries.join(", ")];

    if (hidden_countries.length > 0) {
      display_string.push(' and <a title="');
      display_string.push(hidden_countries.join(", "));
      display_string.push('" class="more-countries-tooltip">');
      display_string.push(hidden_countries.length);
      display_string.push(' more</a>');
    }

    return display_string.join('');
  }.property()
});
