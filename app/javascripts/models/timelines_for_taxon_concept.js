Checklist.TimelinesForTaxonConcept = DS.Model.extend({
  id: DS.attr('number'),
  taxon_concept_id: DS.attr('number'),
  timelines: DS.hasMany('Checklist.Timeline', { embedded: true }),
  timeline_years: DS.hasMany('Checklist.TimelineYear', { embedded: true })
});

Checklist.TimelinesForTaxonConcept.reopenClass({
  url: 'timelines?taxon_concept_ids=%@'
});
