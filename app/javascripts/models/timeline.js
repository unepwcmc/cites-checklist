Checklist.Timeline = DS.Model.extend({
  id: DS.attr('number'),
  appendix: DS.attr('string'),
  party: DS.belongsTo('Checklist.Country', { key: 'party' }),
  timeline_events: DS.hasMany('Checklist.TimelineEvent', { embedded: true }),
  timeline_intervals: DS.hasMany('Checklist.TimelineInterval', { embedded: true }),
  timelines: DS.hasMany('Checklist.Timeline', { embedded: true }),
  hasNestedTimelines: function(){
    return this.get('timelines.length') > 0;
  }.property()
});
