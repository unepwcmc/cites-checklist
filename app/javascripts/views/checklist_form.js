Checklist.ChecklistForm = Em.View.extend({
    tagName: 'form',
    controller: null,
    countryFilter: null,
    regionFilter: null,
    taxonomicLayout: false,

    submit: function(event) {
      event.preventDefault();
      this.get('controller').set('taxonomicLayout', this.get('taxonomicLayout'));
      this.get('controller').set(
        'content',
        Checklist.store.find(Checklist.TaxonConcept, {
          country_ids: this.getPath('countryFilter.selection').mapProperty('id'),
          cites_region_ids: this.getPath('regionFilter.selection').mapProperty('id'),
          output_layout: (this.get('taxonomicLayout') == true ? 'taxonomic' : 'alphabetical')
        })
      )
      
    }
});