Checklist.ListingChange = DS.Model.extend({
  id: DS.attr('number'),
  party: DS.belongsTo('Checklist.Country', { key: 'party_id' }),
  species_listing_name: DS.attr('string'),
  change_type_name: DS.attr('string'),
  effective_at: DS.attr('string', { key: 'effective_at_formatted' }),
  generic_note: DS.attr('string'),
  specific_note: DS.attr('string'),
  symbol:DS.attr('string'),
  parent_symbol: DS.attr('string'),
  hasParty: function(){
    return (this.get('party') !== null);
  }.property(),
  hasSpecificNote: function(){
    return (this.get('specific_note') !== null);
  },
  hasGenericNote: function(){
    return (this.get('generic_note') !== null);
  }
});
