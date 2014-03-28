Checklist.TimelinesForTaxonConcept = DS.Model.extend({
  id: DS.attr('number'),
  taxon_concept_id: DS.attr('number'),
  timelines: DS.hasMany('Checklist.Timeline', { embedded: true }),
  timeline_years: DS.hasMany('Checklist.TimelineYear', { embedded: true }),
  has_descendant_timelines: DS.attr('boolean'),
  has_events: DS.attr('boolean')
});

Checklist.TimelinesForTaxonConcept.reopenClass({
  collectionUrl: 'timelines'
});
