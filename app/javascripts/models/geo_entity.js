Checklist.GeoEntity = DS.Model.extend({
  id: DS.attr('number'),
  name: DS.attr('string'),
  iso_code2: DS.attr('string'),
  is_current: DS.attr('boolean')
});

Checklist.GeoEntity.reopenClass({
  collectionUrl: 'geo_entities'
});