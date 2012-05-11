Checklist.taxonTreeIndexView = Ember.View.extend({
  templateName:    'app/templates/taxon_trees/index',
  taxonTreesBinding: 'Checklist.taxonTreesController',

  refreshListing: function() {
    Checklist.taxonTreesController.findAll();
  }
});