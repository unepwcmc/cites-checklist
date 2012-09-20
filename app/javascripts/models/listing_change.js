Checklist.ListingChange = DS.Model.extend({
  id: DS.attr('number'),
  change_type_name: DS.attr('string'),
  species_listing_name: DS.attr('string'),
  party_name: DS.attr('string'),
  notes: DS.attr('string'),
  effective_at: DS.attr('string')
});
