Checklist.Country = DS.Model.extend({
  id: DS.attr('number'),
  name: DS.attr('string'),
  iso_code2: DS.attr('string')
});

Checklist.Country.reopenClass({
  collectionUrl: 'geo_entities?geo_entity_type=country'
});
