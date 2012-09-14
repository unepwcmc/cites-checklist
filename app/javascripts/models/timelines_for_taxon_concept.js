Checklist.TimelinesForTaxonConcept = DS.Model.extend({
  id: DS.attr('number'),
  taxon_concept_id: DS.attr('number'),
  listing_changes: DS.hasMany('Checklist.ListingChange', { embedded: true }),
  summary_timeline_I: DS.belongsTo('Checklist.Timeline', { embedded: true }),
  summary_timeline_II: DS.belongsTo('Checklist.Timeline', { embedded: true }),
  summary_timeline_III: DS.belongsTo('Checklist.Timeline', { embedded: true })
});

Checklist.TimelinesForTaxonConcept.reopenClass({
  url: 'timelines?taxon_concept_ids=%@'
});
