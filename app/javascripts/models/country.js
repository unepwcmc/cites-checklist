Checklist.Country = DS.Model.extend({
  id: DS.attr('number'),
  iso_name: DS.attr('string'),
  iso2_code: DS.attr('string')
});

Checklist.Country.reopenClass({
  collectionUrl: 'countries'
});