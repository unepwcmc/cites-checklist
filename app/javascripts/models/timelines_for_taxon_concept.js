Checklist.TimelinesForTaxonConcept = DS.Model.extend({
  id: DS.attr('number'),
  taxon_concept_id: DS.attr('number'),
  timelines: DS.hasMany('Checklist.Timeline', { embedded: true }),
  timeline_years: DS.hasMany('Checklist.TimelineYear', { embedded: true }),
  hasDescendantTimelines: DS.attr('boolean'),
  hasEvents: DS.attr('boolean'),
  hasReservations: DS.attr('boolean'),
  isSplitListed: Ember.computed(function() {
    // There is a hard-to-fix upstream bug, and this is a hack to override
    // individual cases. Most of the time we just want to return the value of
    // hasDescendantTimelines but sometimes that's not correct - see
    // https://unep-wcmc.codebasehq.com/projects/cites-support-maintenance/tickets/240
    var overrideSplitListingIds = {
      13183: false, // GENUS Turbinicarpus spp.
    };

    var taxonConceptId = this.get('taxon_concept_id');

    if (
      taxonConceptId && overrideSplitListingIds.hasOwnProperty(taxonConceptId)
    ) {
      return overrideSplitListingIds[taxonConceptId]
    }

    return this.get('hasDescendantTimelines');
  })
});

Checklist.TimelinesForTaxonConcept.reopenClass({
  collectionUrl: 'timelines'
});
