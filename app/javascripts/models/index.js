Checklist.Index = DS.Model.extend({
  taxon_concepts: DS.hasMany('Checklist.TaxonConcept', { embedded: true }),
  animalia_idx: DS.attr('number'),
  plantae_idx: DS.attr('number'),
  result_cnt: DS.attr('number'),//cnt of returned records
  total_cnt: DS.attr('number'),//cnt of all matching records
  taxonConceptsFromIds: function(taxon_concepts, ids){
    var result = [];
    ids.forEach(function(item, index, enumerable){
      var prevTc = taxon_concepts.objectAtContent(index-1);
      var currTc = taxon_concepts.objectAtContent(index);
      if (prevTc === undefined || prevTc.get('higherTaxa').join() != currTc.get('higherTaxa').join()){
        result.push(
          Checklist.TaxonConcept.createRecord(
            {
              rank_name: 'higher-taxa',
              higherTaxaBar: currTc.get('higherTaxa').join(' > ')
            }
          )
        );
      }
      result.push(currTc);
    });
    return result;
  },
  animalia: function(){
    var taxon_concepts = this.get('taxon_concepts');
    var ids = taxon_concepts.get('content').slice(this.get('animalia_idx'), this.get('plantae_idx'));
    return this.taxonConceptsFromIds(taxon_concepts, ids);
  }.property('animalia_idx, plantae_idx'),
  animaliaPresent: function(){
    return this.get('animalia_idx') != this.get('plantae_idx');
  }.property('animalia_idx, plantae_idx'),
  plantae: function(){
    var taxon_concepts = this.get('taxon_concepts');
    var ids = taxon_concepts.get('content').slice(this.get('plantae_idx'));
    return this.taxonConceptsFromIds(taxon_concepts, ids);
  }.property('plantae_idx'),
  plantaePresent: function(){
    return this.get('plantae_idx') != this.get('result_cnt');
  }.property('plantae_idx, result_cnt')
});

Checklist.Index.reopenClass({
  collectionUrl: 'taxon_concepts',
  urlFromParams: function(params){
    //if format not given assume json
    url = this.collectionUrl;
    if (params['format'] !== null && params['format'] !== undefined){
      url = url + '.' + params['format'];
    }
    return url + '?' + $.param(params);
  }
});
