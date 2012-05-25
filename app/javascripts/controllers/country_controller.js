Checklist.countryController = Ember.ArrayController.create({
  content: Checklist.store.findAll(Checklist.Country)
});