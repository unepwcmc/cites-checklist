Checklist.Timeline = DS.Model.extend({
  appendix: DS.attr('string'),
  party: DS.attr('string'),
  events: DS.hasMany('Checklist.TimelineEvent', { embedded: true }),
  intervals: DS.hasMany('Checklist.TimelineInterval', { embedded: true })
});