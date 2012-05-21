Checklist.SelectedCountryController = Ember.Object.create({
  country: null,
  countryDidChange: function() {
    Checklist.CountryController.set(
      'content',
      Checklist.store.find(Checklist.TaxonTree, { country_id: this.get('country').get('id')})
    )
  }.observes('country')
}); 