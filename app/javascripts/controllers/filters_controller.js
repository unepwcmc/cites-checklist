Checklist.FiltersController = Ember.Object.extend({
  countries : [],
  countriesIds : [],
  regions : [],
  regionsIds: [],
  appendices : [],
  appendicesIds : [],
  appendicesContent: [
    Ember.Object.create({abbreviation: 'I'}),
    Ember.Object.create({abbreviation: 'II'}),
    Ember.Object.create({abbreviation: 'III'})
  ],
  taxonomicLayout : false,
  levelOfListing : false,
  showSynonyms : true,
  showAuthor : false,
  showEnglish : true,
  showSpanish : true,
  showFrench : true,
  scientificName : "",
  geoEntityName : "",
  locale: Em.I18n.currentLocale,
  autoCompleteCountriesContent : [],
  autoCompleteRegionsContent : [],
  searches : [],
  page: 1,
  per_page: 20,

  /*
   * These event handlers and the above arrays replace the functionality
   * of the controllers for countries, regions and appendices.
   * This is done primarily so that we can handle isLoaded events on the
   * content arrays for each type of filter.
   */
  countriesContentDidChange: function(){
    if (this.get('countriesContent.isLoaded')){
      var that = this;
      this.set('countries',
        this.get('countriesContent').filter(
          function(item, index, enumerable){
            return that.get('countriesIds').contains(item.get('id'));
          }
        )
      );
      this.set('autoCompleteCountriesContent', this.get('countriesContent'));
      this.set('autoCompleteRegionsContent', this.get('regionsContent'));
    }
  }.observes('countriesContent.isLoaded','countriesIds'),

  regionsContentDidChange: function(){
    if (this.get('regionsContent.isLoaded')){
      var that = this;
      this.set('regions',
        this.get('regionsContent').filter(
          function(item, index, enumerable){
            return that.get('regionsIds').contains(item.get('id'));
          }
        )
      );
    }
  }.observes('regionsContent.isLoaded','regionsIds'),

  appendicesContentDidChange: function(){
    if (this.get('appendicesContent.isLoaded')){
      var that = this;
      this.set('appendices',
        this.get('appendicesContent').filter(
          function(item, index, enumerable){
            return that.get('appendicesIds').contains(item.get('abbreviation'));
          }
        )
      );
    }
  }.observes('appendicesContent.isLoaded','appendicesIds'),

  resetParams: function() {
    this.set('countries',[]);
    this.set('countriesIds',[]);
    this.set('regions',[]);
    this.set('regionsIds',[]);
    this.set('appendices',[]);
    this.set('appendicesIds',[]);
    this.set('scientificName',"");
    this.set('page',1);
  },
  toParams : function() {
    return {
      country_ids : this.get('countries').mapProperty('id'),
      cites_region_ids : this.get('regions').mapProperty('id'),
      cites_appendices : this.get('appendices').mapProperty('abbreviation'),
      output_layout : (this.get('taxonomicLayout') === true ? 'taxonomic' : 'alphabetical'),
      level_of_listing : this.get('levelOfListing') === true ? 1 : 0,
      show_synonyms : this.get('showSynonyms') === true ? 1 : 0,
      show_author : this.get('showAuthor') === true ? 1 : 0,
      show_english : this.get('showEnglish') === true ? 1 : 0,
      show_spanish : this.get('showSpanish') === true ? 1 : 0,
      show_french : this.get('showFrench') === true ? 1 : 0,
      scientific_name : this.get('scientificName'),
      page : this.get('page'),
      per_page : this.get('per_page'),
      locale : Em.I18n.currentLocale
    };
  },

  fullParams : function() {
    return {
      show_synonyms : 1,
      show_author : 1,
      show_english : 1,
      show_spanish : 1,
      show_french : 1,
      intro : 1,
      locale : Em.I18n.currentLocale
    };
  },

  fromParams: function(params) {
    this.set('countriesIds',
      (params.country_ids === undefined ?
        []
      :
        params.country_ids.map(
          function(item, index, enumerable){return parseInt(item, 10);}
        )
      )
    );
    this.set('regionsIds',
      (params.cites_region_ids === undefined ?
        []
      :
        params.cites_region_ids.map(
          function(item, index, enumerable){return parseInt(item, 10);}
        )
      )
    );
    this.set('appendicesIds',
      (params.cites_appendices === undefined ?
        []
      :
        params.cites_appendices
      )
    );
    this.set('taxonomicLayout', params.output_layout == 'taxonomic' ? true : false);
    this.set('levelOfListing', params.level_of_listing == 1 ? true : false);
    this.set('showSynonyms', parseInt(params.show_synonyms, 10) == 1 ? true : false);
    this.set('showAuthor', parseInt(params.show_author, 10) == 1 ? true : false);
    this.set('showEnglish', parseInt(params.show_english, 10) == 1 ? true : false);
    this.set('showSpanish', parseInt(params.show_spanish, 10) == 1 ? true : false);
    this.set('showFrench', parseInt(params.show_french, 10) == 1 ? true : false);
    this.set('scientificName', params.scientific_name || "");
    this.set('page', parseInt(params.page, 10) || 1);
    this.set('perPage', parseInt(params.perPage, 10) || 20);
  }
});
