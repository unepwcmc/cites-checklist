Checklist.TimelineEvent = DS.Model.extend({
  id: DS.attr('number'),
  party: DS.attr('string'),
  change_type_name: DS.attr('string'),
  effective_at: DS.attr('string'),
  specific_notes: DS.attr('string'),
  generic_notes: DS.attr('string'),
  symbol: DS.attr('string'),
  parent_symbol: DS.attr('string'),
  pos: DS.attr('number')
});