Checklist.ChecklistForm = Em.View.extend({
    tagName: 'form',
    controller: null,
    countryFilter: null,

    submit: function(event) {
      event.preventDefault();
      this.get('controller').set(
        'content',
        Checklist.store.find(Checklist.TaxonConcept, {
          country_ids: this.getPath('countryFilter.selection').mapProperty('id')
        })
      )
      
    }
});