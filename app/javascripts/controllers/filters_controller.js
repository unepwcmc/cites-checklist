Checklist.FiltersController = Ember.Object.extend({
  searches : [],
  countries : [],
  regions : [],
  appendices : [],
  taxonomicLayout : false,
  page: 0,
  per_page: 50,
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
    //for (var key in params) {
      //params[key].forEach(function(item) {
        /*
         * get appropriate controller
         * Clear key[]
         * key << controller.get('content').objectAt(item)
         * controller.set('content', Checklist.store.find(
         *    Checklist.Index, this.get('filtersController').toParams()
         *    ))
         */

      //});
    //}
    params['countries'].forEach(function(item) {
      console.log('Looking for: '+item);
      console.log(Checklist.countriesController.get('content').objectAt(item));
    });
  }
});
