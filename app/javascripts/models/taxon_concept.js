Checklist.TaxonConcept = DS.Model.extend({
  taxon_name: DS.belongsTo('Checklist.TaxonName', { embedded: true }),
  parent: DS.belongsTo('Checklist.TaxonConcept', { key: 'parent_id'}),
  depth: DS.attr('number'),
  scientific_name: DS.attr('string'),
  rank_name: DS.attr('string'),
  binomen: function() {
    return this.getPath('parent.scientific_name') +
           " " + this.get('scientific_name');
  }.property('parent.scientific_name', 'scientific_name'),
  trinomen: function() {
    return this.getPath('parent.parent.scientific_name') +
           " " + this.getPath('parent.scientific_name') +
           " ssp. " + this.get('scientific_name');
  }.property('parent.scientific_name', 'scientific_name'),
  full_name: function() {
    if (this.get('rank_name') == 'Species') {
      return this.get('binomen');
    } else if (this.get('rank_name') === 'Subspecies') {
      return this.get('trinomen');
    } else {
      return this.get('rank_name') + ': ' + this.get('scientific_name');
    }
  }.property('rank_name','scientific_name'),
});

Checklist.TaxonConcept.reopenClass({
  collectionUrl: 'taxon_concepts'
});