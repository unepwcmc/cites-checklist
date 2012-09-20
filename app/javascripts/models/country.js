Checklist.Country = DS.Model.extend({
  id: DS.attr('number'),
  name: DS.attr('string')
});

Checklist.Country.reopenClass({
  collectionUrl: 'geo_entities/COUNTRY'
});
