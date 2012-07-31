Checklist.AppendicesController = Ember.ArrayController.extend({
  content: Checklist.store.findAll(Checklist.Appendix)
});