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

      classes.push((this.content.get('rank_name') + '-taxon').toLowerCase());

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
      return this.get('content.english').split(',');
    }.property('english'),
    spanish: function() {
      return this.get('content.spanish').split(',');
    }.property('spanish'),
    french: function() {
      return this.get('content.french').split(',');
    }.property('french'),
    synonyms: function() {
      if (this.get('filtersController').showAuthor) {
        return this.get('content.synonyms_with_authors');
      } else {
        return this.get('content.synonyms');
      }
    }.property('content.synonyms', 'content.synonyms_with_authors'),
    showEnglish: function(){
      return this.get('filtersController').showEnglish &&
        this.content.get('english') !== null &&
        this.content.get('english').length > 0;
    }.property(),
    showSpanish: function(){
      return this.get('filtersController').showSpanish &&
        this.content.get('spanish') !== null &&
        this.content.get('spanish').length > 0;
    }.property(),
    showFrench: function(){
      return this.get('filtersController').showFrench &&
        this.content.get('french') !== null &&
        this.content.get('french').length > 0;
    }.property(),
    showSynonyms: function(){
      return this.get('filtersController').showSynonyms &&
        this.get('synonyms') !== null &&
        this.get('synonyms').length > 0;
    }.property(),
    showAuthor: function(){
      return this.get('filtersController').showAuthor &&
        this.content.get('author_year') !== null &&
        this.content.get('author_year').length > 0;
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

    isTaxonomicLayout: function() {
      return this.get('filtersController').taxonomicLayout;
    }.property(),

    click: function(event) {
      // Ignore clicks on the history graph
      if ($(event.target).parents('.slide').length > 0) return;
      // Ignore clicks on circle icons
      if ($(event.target).hasClass('circle')) return;

      if (!this.get('context.isLoaded')) return;

      var $timeline = this.$().find('.area-holder');
      var that = this;

      if ($timeline.find('.area-b').length == 0) {
        var view = Checklist.TaxonConceptHistoryView.create({
          content: that.get('context.timelines_for_taxon_concept')
        });

        view._insertElementLater(function() {
          this.set('isVisible', true);
          this.$().prependTo($timeline);
        });
      }

      Ember.run.next(this, function(){
        this.$().stop().toggleClass('expanded');
        this.$().find('.slide').stop().slideToggle();
      });
    }
  })
});
