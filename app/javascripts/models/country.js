Checklist.Country = DS.Model.extend({
  id: DS.attr('number'),
  name: DS.attr('string'),
  iso_code2: DS.attr('string')
});

Checklist.Country.reopenClass({
  // IE10 for some reason aappends a questionmark to this url
  // consequently, territories would not get fetched for location dropdown
  // this is an ugly workaround to a problem that seems to be too ember-data
  // specific
  collectionUrl: 'geo_entities?geo_entity_types[]=country&geo_entity_types[]=territory&1'
});
