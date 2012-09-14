Checklist.TimelineEvent = DS.Model.extend({
  id: DS.attr('number'),
  //listing_change_id: DS.attr('number'),
  //listing_change: DS.belongsTo('Checklist.ListingChange', { key: 'listing_change_id'}),
  change_type_name: DS.attr('string'),
  pos: DS.attr('number')
});