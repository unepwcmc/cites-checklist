Checklist.Region = DS.Model.extend({
  id: DS.attr('number'),
  name: DS.attr('string')
});

Checklist.Region.reopenClass({
  collectionUrl: 'geo_entities/CITES_REGION'
});