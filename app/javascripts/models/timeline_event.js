Checklist.TimelineEvent = DS.Model.extend({
  id: DS.attr('number'),
  change_type_name: DS.attr('string'),
  effective_at: DS.attr('date'),
  pos: DS.attr('number')
});