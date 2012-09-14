Checklist.SummaryTimeline = DS.Model.extend({
  id: DS.attr('number'),
  appendix: DS.attr('string'),
  party: DS.attr('string'),
  timeline_events: DS.hasMany('Checklist.TimelineEvent', { embedded: true }),
  timeline_intervals: DS.hasMany('Checklist.TimelineInterval', { embedded: true })
});