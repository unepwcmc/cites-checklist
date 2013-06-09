Checklist.Appendix = DS.Model.extend({
  id: DS.attr('number'),
  abbreviation: DS.attr('string'),
  name: DS.attr('string')
});

Checklist.Appendix.reopenClass({
  collectionUrl: 'species_listings?designation=cites'
});
