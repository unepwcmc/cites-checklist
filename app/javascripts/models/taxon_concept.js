Checklist.TaxonConcept = DS.Model.extend({
  taxon_name: DS.belongsTo('Checklist.TaxonName', { embedded: true }),
  parent: DS.belongsTo('Checklist.TaxonConcept', { key: 'parent_id'}),
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
  english: DS.attr('string', { key: 'english_names_list' }),
  spanish: DS.attr('string', { key: 'spanish_names_list' }),
  french: DS.attr('string', { key: 'french_names_list' }),
  synonyms: DS.attr('string', { key: 'synonyms_list' }),
  itemType: DS.attr('string', { key: 'item_type' }),
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
});

