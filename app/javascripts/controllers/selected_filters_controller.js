Checklist.selectedFiltersController = Ember.Object.create({
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
  }
});
