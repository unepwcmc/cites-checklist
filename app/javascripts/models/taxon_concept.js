Checklist.TaxonConcept = DS.Model.extend({
  taxon_name: DS.belongsTo('Checklist.TaxonName', { embedded: true }),
  parent: DS.belongsTo('Checklist.TaxonConcept', { key: 'parent_id'}),
  depth: DS.attr('number'),
  scientific_name: DS.attr('string'),
  rank_name: DS.attr('string'),
  class_name: DS.attr('string'),
  family_name: DS.attr('string'),
  genus_name: DS.attr('string'),
  species_name: DS.attr('string'),

  full_name: function() {
    if (this.get('rank_name') == 'SPECIES') {
      return this.get('genus_name') + ' ' + 
      this.get('scientific_name')
    } else if (this.get('rank_name') === 'SUBSPECIES') {
      return this.get('genus_name') + ' ' + this.get('species_name') + ' ' +
      this.get('scientific_name')
    } else {
      return this.get('rank_name') + ': ' + this.get('scientific_name');
    }
  }.property('rank_name','scientific_name'),
});

Checklist.TaxonConcept.reopenClass({
  collectionUrl: 'taxon_concepts'
});