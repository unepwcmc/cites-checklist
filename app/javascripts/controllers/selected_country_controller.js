Checklist.SelectedCountryController = Ember.Object.create({
  country: null,
  countryDidChange: function() {
    Checklist.TaxonConceptController.set(
      'content',
      Checklist.store.find(Checklist.TaxonConcept, { country_id: this.get('country').get('id')})
    )
  }.observes('country')
}); 