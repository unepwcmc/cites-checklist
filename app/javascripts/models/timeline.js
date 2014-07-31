/*
 * Add an array primitive to Ember Data models
 */
DS.attr.transforms.array = {
  from: function(serialized) {
    return serialized;
  },
  to: function(deserialized) {
    return deserialized;
  }
};

Checklist.Timeline = DS.Model.extend({
  id: DS.attr('number'),
  appendix: DS.attr('string'),
  party: DS.belongsTo('Checklist.Country', { key: 'party' }),
  timeline_events: DS.hasMany('Checklist.TimelineEvent', { embedded: true }),
  timeline_intervals: DS.hasMany('Checklist.TimelineInterval', { embedded: true }),
  timelines: DS.hasMany('Checklist.Timeline', { embedded: true }),
  parties: DS.attr('array', { defaultValue: [] }),
  continuesInPresent: DS.attr('boolean'),
  hasNestedTimelines: DS.attr('boolean')
});
