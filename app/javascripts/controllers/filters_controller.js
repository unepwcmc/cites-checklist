Checklist.FiltersController = Ember.Object.extend({
  countries : [],
  regions : [],
  appendices : [],
  taxonomicLayout : false,
  toParams : function() {
    return {
      country_ids : this.get('countries').mapProperty('id'),
      cites_region_ids : this.get('regions').mapProperty('id'),
      cites_appendices : this.get('appendices').mapProperty('abbreviation'),
      output_layout : (this.get('taxonomicLayout') == true ? 'taxonomic' : 'alphabetical')
    }
  }
});
