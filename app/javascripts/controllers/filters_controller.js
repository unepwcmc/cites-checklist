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
  showAuthor : true,
  showEnglish : true,
  showSpanish : true,
  showFrench : true,
  scientificName : "",
  geoEntityName : "",
  autoCompleteCountriesContent : [],
  autoCompleteRegionsContent : [],
  searches : [],
  page: 1,
  per_page: 20,

  countriesContentDidChange: function(){
    if (this.get('geoEntitiesController.countries.isLoaded')){
      var that = this;
      this.set('countries',
        this.get('geoEntitiesController.countries').filter(
          function(item, index, enumerable){
            return that.get('countriesIds').contains(item.get('id'));
          }
        )
      );
      this.set(
        'autoCompleteCountriesContent',
        this.get('geoEntitiesController.countries').filterProperty('is_current')
      );
    }
  }.observes('geoEntitiesController.countries.isLoaded','countriesIds.@each'),

  regionsContentDidChange: function(){
    if (this.get('geoEntitiesController.regions.isLoaded')){
      var that = this;
      this.set('regions',
        this.get('geoEntitiesController.regions').filter(
          function(item, index, enumerable){
            return that.get('regionsIds').contains(item.get('id'));
          }
        )
      );
      this.set(
        'autoCompleteRegionsContent',
        this.get('geoEntitiesController.regions').filterProperty('is_current')
      );
    }
  }.observes('geoEntitiesController.regions.isLoaded','regionsIds.@each'),

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
      per_page : this.get('per_page')
    };
  },

  fullParams : function() {
    return {
      show_synonyms : 1,
      show_author : 1,
      show_english : 1,
      show_spanish : 1,
      show_french : 1,
      intro : 1
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
