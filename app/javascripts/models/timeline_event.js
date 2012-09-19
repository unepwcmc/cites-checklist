Checklist.TimelineEvent = DS.Model.extend({
  id: DS.attr('number'),
  party: DS.attr('string'),
  change_type_name: DS.attr('string'),
  effective_at: DS.attr('string'),
  notes: DS.attr('string'),
  pos: DS.attr('number')
});