require('checklist/config');
require('checklist/vendor/jquery-1.7.2');
require('checklist/vendor/ember-latest');
require('checklist/vendor/ember-data');
require('checklist/templates/main_view');
require('checklist/templates/show_view');

Ember.ENV.CP_DEFAULT_CACHEABLE = true;
Ember.ENV.VIEW_PRESERVES_CONTEXT = true;
Checklist = Ember.Application.create({
    ready: function() {}
});

Checklist.SAPIAdapter = DS.Adapter.extend({
  findAll: function(store, type) {
    var url = this.url + type.url;
    jQuery.getJSON(url, {format: 'json', jsoncallback: '?'}, function(data) {
      // data is an Array of Hashes in the same order as the original
      // Array of IDs. If your server returns a root, simply do something
      // like:
      // store.loadMany(type, ids, data.people)
      store.loadMany(type, data);
    });
  }
});

Checklist.store = DS.Store.create({
  revision: 4,
  adapter: Checklist.SAPIAdapter.create({
    bulkCommit: false,
    url: window.BACKEND_URL
  })
});

Checklist.TaxonConcept = DS.Model.extend({
  taxon_name: DS.belongsTo('Checklist.TaxonName', { embedded: true }),
  depth: DS.attr('number'),
  created_at: DS.attr('date'),
  full_name: Ember.computed(function() {
    return this.getPath('taxon_name.scientific_name');
  }).property('taxon_name.scientific_name', 'taxon_name_id')

});

Checklist.TaxonConcept.reopenClass({
  url: 'taxon_concepts'
});

Checklist.TaxonName = DS.Model.extend({
  scientific_name: DS.attr('string')
});

Checklist.TaxonTree = DS.Model.extend({
  taxon_concepts: DS.hasMany('Checklist.TaxonConcept', { embedded: true})
});

Checklist.TaxonTree.reopenClass({
  url: 'taxon_trees'
});

Checklist.TaxonTreeController = Ember.ArrayController.create({
  content: Checklist.store.findAll(Checklist.TaxonTree),
});

/*
Checklist.TaxonConceptController = Ember.ArrayController.create({
  content: Checklist.store.findAll(Checklist.TaxonConcept),
});
*/
Checklist.MainView = Ember.View.extend({
  templateName: 'main_view',
  //taxonConceptsBinding: 'Checklist.TaxonConceptController'
  taxonTreesBinding: 'Checklist.TaxonTreeController'
});

Checklist.TaxonTreeShowView = Ember.View.extend({
  templateName: 'show_view'
})
