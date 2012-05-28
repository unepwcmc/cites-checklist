Checklist.ChecklistForm = Em.View.extend({
    tagName: 'form',
    controller: null,
    countryFilter: null,
    regionFilter: null,

    submit: function(event) {
      event.preventDefault();
      this.get('controller').set(
        'content',
        Checklist.store.find(Checklist.TaxonConcept, {
          country_ids: this.getPath('countryFilter.selection').mapProperty('id'),
          cites_region_ids: this.getPath('regionFilter.selection').mapProperty('id')
        })
      )
      
    }
});