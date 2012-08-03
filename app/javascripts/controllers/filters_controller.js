Checklist.FiltersController = Ember.Object.extend({
  countriesContent : Checklist.store.findQuery(Checklist.Country, {'q': ''}),
  countries : [],
  countriesIds : [],
  regionsContent : Checklist.store.findQuery(Checklist.Region, {'q': ''}),
  regions : [],
  regionsIds: [],
  appendicesContent : Checklist.store.findQuery(Checklist.Appendix, {'q': ''}),
  appendices : [],
  appendicesIds : [],
  taxonomicLayout : false,
  searches : [],
  page: 0,
  per_page: 50,

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
  }
});
