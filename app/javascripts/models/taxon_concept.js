Checklist.TaxonConcept = DS.Model.extend({
  taxon_name: DS.belongsTo('Checklist.TaxonName', { embedded: true }),
  depth: DS.attr('number'),
  created_at: DS.attr('date'),
  full_name: Ember.computed(function() {
    return this.getPath('taxon_name.scientific_name');
  }).property('taxon_name.scientific_name', 'taxon_name_id')
});