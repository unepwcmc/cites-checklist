Checklist.CountriesController = Ember.ArrayController.extend({
  content: Checklist.store.findAll(Checklist.Country)
});
