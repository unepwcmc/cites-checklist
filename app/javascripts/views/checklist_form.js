Checklist.ChecklistForm = Em.View.extend({
    tagName: 'form',
    controller: null,
    filtersController: null,
    countryFilter: null,
    regionFilter: null,
    taxonomicLayoutSwitch: null,

    submit: function(event) {
      event.preventDefault();
      this.get('controller').set(
        'content',
        Checklist.store.find(
          Checklist.TaxonConcept, this.get('filtersController').toParams()
        )
      )
      
    }
});