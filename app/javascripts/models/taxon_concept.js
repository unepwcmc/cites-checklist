Checklist.TaxonConcept = DS.Model.extend({
  id: DS.attr('number'),
  taxon_name: DS.belongsTo('Checklist.TaxonName', { embedded: true }),
  parent: DS.belongsTo('Checklist.TaxonConcept', { key: 'parent_id' }),
  countries: DS.hasMany('Checklist.Country', { key: 'countries_ids' }),
  timelines_for_taxon_concept: DS.belongsTo('Checklist.TimelinesForTaxonConcept', { key: 'id' }),
  rank_name: DS.attr('string'),
  spp: DS.attr('string'),
  current_listing: DS.attr('string'),
  phylum_name: DS.attr('string'),
  class_name: DS.attr('string'),
  order_name: DS.attr('string'),
  family_name: DS.attr('string'),
  genus_name: DS.attr('string'),
  full_name: DS.attr('string'),
  cites_accepted: DS.attr('boolean'),
  recently_changed: DS.attr('boolean'),
  english: DS.attr('string', { key: 'english_names_list' }),
  spanish: DS.attr('string', { key: 'spanish_names_list' }),
  french: DS.attr('string', { key: 'french_names_list' }),
  synonyms: DS.attr('string', { key: 'synonyms_list' }),
  itemType: DS.attr('string', { key: 'item_type' }),
<<<<<<< HEAD
<<<<<<< HEAD
  ancestorsPath: DS.attr('string', { key: 'ancestors_path' }),
  higherTaxa: function(){
    return this.get('ancestorsPath').split(',');
  }.property()
=======
  higherTaxa: function(){
    var ranks = ['PHYLUM', 'CLASS', 'ORDER', 'FAMILY'];
    var rankIndex = ranks.indexOf(this.get('rank_name'));
    if (rankIndex == -1){
      rankIndex = ranks.length;
    }
    var res = [];
    var that = this;
    ranks.slice(0,rankIndex).forEach(function(rank){
      res.push(that.get(rank.toLowerCase()+'_name'));
    });
    return res;
  }.property('rank_name')
>>>>>>> parent of 85bf588... use the backend generated higher taxa bars
=======
  ancestorsPath: DS.attr('string'),
  higherTaxa: function(){
    if (this.get('ancestorsPath') !== null){
      return this.get('ancestorsPath').split(',');
    } else {
      return [];
    }
  }.property('ancestorsPath')
>>>>>>> parent of d5cd888... fixed display of higher taxa bar elements
});

