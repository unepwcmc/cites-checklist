Checklist.FiltersController = Ember.Object.extend({
  countriesContent: Checklist.store.findAll(Checklist.Country),
  countries : [],
  countriesIds: [],
  searches : [],
  regions : [],
  appendices : [],
  taxonomicLayout : false,
  page: 0,
  per_page: 50,
  countriesSelection: function(){
    if (this.get('countriesIds').length > 0){
      this.set('countries', Checklist.store.findMany(Checklist.Country,this.get('countriesIds')));
      this.set('countriesIds',[]);
    }
    return this.get('countries');
  }.property('countriesIds', 'countriesContent').volatile(),
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

    this.set('countriesIds', (params['country_ids'] == undefined ? [] : params['country_ids']));
    this.set('countries', this.get('countriesSelection'));
  }
});
