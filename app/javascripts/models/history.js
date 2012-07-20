Checklist.History = DS.Model.extend({
  animalia: DS.hasMany('Checklist.TaxonConcept', { embedded: true }),
  plantae: DS.hasMany('Checklist.TaxonConcept', { embedded: true })
});

Checklist.History.reopenClass({
  collectionUrl: 'taxon_concepts/history',
  urlFromParams: function(params){
    //if format not given assume json
    url = this.collectionUrl;
    if (params['format'] !== null && params['format'] !== undefined){
      url = url + '.' + params['format'];
    }
    return url + '?' + $.param(params);
  }
});