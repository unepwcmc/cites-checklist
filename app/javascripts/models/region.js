Checklist.Region = DS.Model.extend({
  id: DS.attr('number'),
  name: DS.attr('string')
});

Checklist.Region.reopenClass({
  collectionUrl: 'geo_entities?geo_entity_types_set=1'
});
