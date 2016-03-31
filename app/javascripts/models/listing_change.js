Checklist.ListingChange = DS.Model.extend({
  id: DS.attr('number'),
  party: DS.belongsTo('Checklist.GeoEntity', { key: 'party_id' }),
  countries: DS.hasMany('Checklist.GeoEntity', { key: 'countries_ids' }),
  species_listing_name: DS.attr('string'),
  change_type_name: DS.attr('string'),
  effective_at: DS.attr('string', { key: 'effective_at_formatted' }),
  auto_note: DS.attr('string'),
  short_note: DS.attr('string'),
  full_note: DS.attr('string'),
  hash_full_note: DS.attr('string'),
  hash_ann_symbol:DS.attr('string'),
  hash_ann_parent_symbol: DS.attr('string'),
  inherited_short_note: DS.attr('string'),
  inherited_full_note: DS.attr('string'),
  nomenclature_note: DS.attr('string'),

  hasParty: function(){
    return (this.get('party') !== null);
  }.property(),
  hasInheritedNote: function(){
    return (this.get('inherited_full_note') !== null || this.get('inherited_short_note') !== null);
  }.property()
});
