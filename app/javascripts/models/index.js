Checklist.Index = DS.Model.extend({
  animalia: DS.hasMany('Checklist.TaxonConcept', { embedded: true }),
  plantae: DS.hasMany('Checklist.TaxonConcept', { embedded: true }),
  result_cnt: DS.attr('number'),//cnt of returned records
  total_cnt: DS.attr('number'),//cnt of all matching records
  animaliaPresent: function(){
    return this.get('animalia.length') > 0;
  }.property('animalia'),
  plantaePresent: function(){
    return this.get('plantae.length') > 0;
  }.property('plantae'),
  contentIds: function(){
    return this.get('animalia').mapProperty('id').concat(
      this.get('plantae').mapProperty('id')
    );
  }.property('content'),
});

Checklist.Index.reopenClass({
  collectionUrl: 'taxon_concepts',
  urlFromParams: function(params){
    //if format not given assume json
    url = this.collectionUrl;
    if (params.format !== null && params.format !== undefined){
      url = url + '.' + params.format;
    }
    return url + '?' + $.param(params);
  }
});
