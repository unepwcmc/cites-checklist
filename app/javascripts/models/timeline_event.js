Checklist.TimelineEvent = DS.Model.extend({
  id: DS.attr('number'),
  party: DS.belongsTo('Checklist.Country', { key: 'party' }),
  change_type_name: DS.attr('string'),
  effective_at: DS.attr('string'),
  is_current: DS.attr('boolean'),
  specific_notes: DS.attr('string'),
  generic_notes: DS.attr('string'),
  symbol: DS.attr('string'),
  parent_symbol: DS.attr('string'),
  pos: DS.attr('number')
});
