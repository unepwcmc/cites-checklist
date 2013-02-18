Checklist.ListingChange = DS.Model.extend({
  id: DS.attr('number'),
  party: DS.belongsTo('Checklist.Country', { key: 'party_id' }),
  countries: DS.hasMany('Checklist.Country', { key: 'countries_ids' }),
  species_listing_name: DS.attr('string'),
  change_type_name: DS.attr('string'),
  effective_at: DS.attr('string', { key: 'effective_at_formatted' }),
  short_note_en: DS.attr('string'),
  full_note_en: DS.attr('string'),
  hash_full_note_en: DS.attr('string'),
  hash_ann_symbol:DS.attr('string'),
  hash_ann_parent_symbol: DS.attr('string'),
  hasParty: function(){
    return (this.get('party') !== null);
  }.property(),
  hasFullNote: function(){
    return (this.get('full_note_en') !== null);
  }.property(),
  hasShortNote: function(){
    return (this.get('short_note_en') !== null);
  }.property(),
  hasHashFullNote: function(){
    return (this.get('hash_full_note_en') !== null);
  }.property()
});
