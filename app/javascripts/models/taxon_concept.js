Checklist.TaxonConcept = DS.Model.extend({
  id: DS.attr('number'),
  parent: DS.belongsTo('Checklist.TaxonConcept', { key: 'parent_id' }),
  countries: DS.hasMany('Checklist.Country', { key: 'countries_ids' }),
  timelines_for_taxon_concept: DS.belongsTo('Checklist.TimelinesForTaxonConcept', { key: 'id' }),
  current_additions: DS.hasMany('Checklist.ListingChange', { embedded : true }),
  rank_name: DS.attr('string'),
  current_listing: DS.attr('string'),
  kingdom_name: DS.attr('string'),
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
  synonyms: DS.attr('array', { defaultValue: [] }),
  synonyms_with_authors: DS.attr('array', { defaultValue: [] }),
  itemType: DS.attr('string', { key: 'item_type' }),
  ancestorsPath: DS.attr('string', { key: 'ancestors_path' }),
  isPlant: function(){
    return this.get('kingdom_name') == 'Plantae';
  }.property(),
  higherTaxa: function(){
    return this.get('ancestorsPath').split(',');
  }.property(),
  _cites_populations: [],
  cites_populations: function(){
    return this.get('_cites_populations');
  }.property('_cites_populations.@each'),
  populationsDidLoad: function(){
    Ember.run.once(this, 'createCitesPopulations');
  }.observes('current_additions.@each.countries.@each.didLoad'),
  createCitesPopulations: function(){
    //this should run only once per taxon concept
    var populations = this.get('countries').map(function(cnt){
      return Checklist.CitesPopulation.create({
        name: cnt.get('name')
      });
    });
    var defaultAppendix = null;
    if (this.get('current_additions.length') > 0){
      this.get('current_additions').forEach(function(listing_change){
        if (listing_change.get('countries.length') > 0){
          //now we go over countries listed under this appendix
          //to mark them accordingly in the main distribution list
          listing_change.get('countries').forEach(function(country){
            var population = populations.findProperty('name', country.get('name'));
            if (population !== undefined && population !== null){
              population.species_listing_name = listing_change.get('species_listing_name');
            }
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
      });
    }
    this.set('_cites_populations', populations);
  },
  current_parties: DS.hasMany('Checklist.Country', { key: 'current_parties_ids' })
});
