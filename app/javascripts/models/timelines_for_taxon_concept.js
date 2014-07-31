Checklist.TimelinesForTaxonConcept = DS.Model.extend({
  id: DS.attr('number'),
  taxon_concept_id: DS.attr('number'),
  timelines: DS.hasMany('Checklist.Timeline', { embedded: true }),
  timeline_years: DS.hasMany('Checklist.TimelineYear', { embedded: true }),
  hasDescendantTimelines: DS.attr('boolean'),
  hasEvents: DS.attr('boolean'),
  hasReservations: DS.attr('boolean')
});

Checklist.TimelinesForTaxonConcept.reopenClass({
  collectionUrl: 'timelines'
});
