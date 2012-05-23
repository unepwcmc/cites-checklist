Checklist.CountryController = Ember.ArrayController.create({
  content: Checklist.store.findAll(Checklist.Country)
});