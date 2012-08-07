Checklist.FiltersController = Ember.Object.extend({
  /*
   * In the current version of Ember (0.9.8.1) findAll does not fire
   * loading events properly, so we use findQuery with an empty query
   * string.
   */
  countriesContent : Checklist.store.findQuery(Checklist.Country, {}),
  countries : [],
  countriesIds : [],
  regionsContent : Checklist.store.findQuery(Checklist.Region, {}),
  regions : [],
  regionsIds: [],
  appendicesContent : Checklist.store.findQuery(Checklist.Appendix, {}),
  appendices : [],
  appendicesIds : [],
  taxonomicLayout : false,
  showSynonyms : true,
  showEnglish : true,
  showSpanish : true,
  showFrench : true,
  scientificName : "",
  searches : [],
  page: 0,
  per_page: 50,

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

  toParams : function() {
    return {
      country_ids : this.get('countries').mapProperty('id'),
      cites_region_ids : this.get('regions').mapProperty('id'),
      cites_appendices : this.get('appendices').mapProperty('abbreviation'),
      output_layout : (this.get('taxonomicLayout') == true ? 'taxonomic' : 'alphabetical'),
      show_synonyms : this.get('showSynonyms') == true ? 1 : 0,
      show_english : this.get('showEnglish') == true ? 1 : 0,
      show_spanish : this.get('showSpanish') == true ? 1 : 0,
      show_french : this.get('showFrench') == true ? 1 : 0,
      scientific_name : this.get('scientificName'),
      page : this.get('page'),
      per_page : this.get('per_page')
    }
  },
  fromParams: function(params) {
    var controller = Checklist.get('router').get('taxonConceptController');

    controller.set(
      'content',
      Checklist.store.find(
        Checklist.Index, params
      )
    );

    this.set('countriesIds',
      (params['country_ids'] == undefined ?
        []
      :
        params['country_ids'].map(
          function(item, index, enumerable){return parseInt(item);}
        )
      )
    );
    this.set('regionsIds',
      (params['cites_region_ids'] == undefined ?
        []
      :
        params['cites_region_ids'].map(
          function(item, index, enumerable){return parseInt(item);}
        )
      )
    );
    this.set('appendicesIds',
      (params['cites_appendices'] == undefined ?
        []
      :
        params['cites_appendices']
      )
    );
    this.set('taxonomicLayout', params['output_layout'] == 'taxonomic' ? true : false);
    this.set('showSynonyms', parseInt(params['show_synonyms']) == 1 ? true : false);
    this.set('showEnglish', parseInt(params['show_english']) == 1 ? true : false);
    this.set('showSpanish', parseInt(params['show_spanish']) == 1 ? true : false);
    this.set('showFrench', parseInt(params['show_french']) == 1 ? true : false);
    this.set('scientificName', params['scientific_name']);
    this.set('page', parseInt(params['page']));
    this.set('perPage', parseInt(params['perPage']));
  }
});
