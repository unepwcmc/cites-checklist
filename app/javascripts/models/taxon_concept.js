Checklist.TaxonConcept = DS.Model.extend({
  id: DS.attr('number'),
  parent: DS.belongsTo('Checklist.TaxonConcept', { key: 'parent_id' }),
  countries: DS.hasMany('Checklist.Country', { key: 'countries_ids' }),
  timelines_for_taxon_concept: DS.belongsTo('Checklist.TimelinesForTaxonConcept', { key: 'id' }),
  current_listing_changes: DS.hasMany('Checklist.ListingChange', { embedded : true }),
  rank_name: DS.attr('string'),
  spp: DS.attr('string'),
  current_listing: DS.attr('string'),
  phylum_name: DS.attr('string'),
  class_name: DS.attr('string'),
  order_name: DS.attr('string'),
  family_name: DS.attr('string'),
  genus_name: DS.attr('string'),
  full_name: DS.attr('string'),
  author_year: DS.attr('string'),
  cites_accepted: DS.attr('boolean'),
  recently_changed: DS.attr('boolean'),
  english: DS.attr('string', { key: 'english_names' }),
  spanish: DS.attr('string', { key: 'spanish_names' }),
  french: DS.attr('string', { key: 'french_names' }),
  synonyms: DS.attr('string', { key: 'synonyms' }),
  itemType: DS.attr('string', { key: 'item_type' }),
  ancestorsPath: DS.attr('string', { key: 'ancestors_path' }),
  higherTaxa: function(){
    return this.get('ancestorsPath').split(',');
  }.property(),
  _cites_populations: [],
  cites_populations: function(){
    return this.get('_cites_populations');
  }.property('_cites_populations.@each'),
  populationsDidChange: function(){
    Ember.run.once(this, 'createCitesPopulations');
  }.observes('countries.@each', 'current_listing_changes.@each.countries.@each'),
  partiesDidChange: function(){
    Ember.run.once(this, 'createParties');
  }.observes('current_listing_changes.@each.party_id'),
  createCitesPopulations: function(){
    //this should run only once per taxon concept
    var populations = this.get('countries').map(function(cnt){
      return Checklist.CitesPopulation.create({
        name: cnt.get('name')
      });
    });
    var defaultAppendix = null;
    if (this.get('current_listing_changes.length') > 0){
      this.get('current_listing_changes').forEach(function(listing_change){
        if (listing_change.get('countries.length') > 0){
          //now we go over countries listed under this appendix
          //to mark them accordingly in the main distribution list
          listing_change.get('countries').forEach(function(country){
            var population = populations.findProperty('name', country.get('name'));
            population.species_listing_name = listing_change.get('species_listing_name');
          });
        } else {
          defaultAppendix = listing_change.get('species_listing_name');
        }
      });
    } else {
      defaultAppendix = this.get('current_listing');
    }
    if (defaultAppendix !== null){
      //go over all the countries not yet marked with any appendix
      //and mark them with default appendix
      populations.filter(function(item){
        return item.species_listing_name === null;
      }).forEach(function(item){
        item.species_listing_name = defaultAppendix;
      })
    }
    this.set('_cites_populations', populations);
  },
  _parties: [],
  parties: function(){
    return this.get('_parties');
  }.property('_parties.@each'),
  createParties: function(){
    this.set(
      '_parties',
      this.get('current_listing_changes').filter(function(lc){
        return lc.get('change_type_name') == 'ADDITION' && lc.get('party') !== null;
      }).mapProperty('party')
    );
  }

});
