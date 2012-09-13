Checklist.TimelineEvent = DS.Model.extend({
  listing_change: DS.belongsTo('Checklist.ListingChange', { key: 'listing_change_id'}),
  pos: DS.attr('number')
});