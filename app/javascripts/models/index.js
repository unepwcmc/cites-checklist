Checklist.Index = DS.Model.extend({
  taxon_concepts: DS.hasMany('Checklist.TaxonConcept', { embedded: true }),
  animalia_idx: DS.attr('number'),
  plantae_idx: DS.attr('number'),
  total_cnt: DS.attr('number'),
  animalia: function(){
    var taxon_concepts = this.get('taxon_concepts');
    var ids = taxon_concepts.get('content').slice(this.get('animalia_idx'), this.get('plantae_idx'));
    return ids.map(function(item, index, enumerable){
      return taxon_concepts.objectAtContent(index);
    });
  }.property('animalia_idx, plantae_idx'),
  animaliaPresent: function(){
    return this.get('animalia_idx') != this.get('plantae_idx');
  }.property('animalia_idx, plantae_idx'),
  plantae: function(){
    var taxon_concepts = this.get('taxon_concepts');
    var ids = taxon_concepts.get('content').slice(this.get('plantae_idx'));
    return ids.map(function(item, index, enumerable){
      return taxon_concepts.objectAtContent(index);
    });
  }.property('plantae_idx'),
  plantaePresent: function(){
    return this.get('plantae_idx') != this.get('total_cnt');
  }.property('plantae_idx, total_cnt')
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
