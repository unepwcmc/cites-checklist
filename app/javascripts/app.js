require('checklist/config');
require('checklist/vendor/jquery-1.7.2');
require('checklist/vendor/ember-0.9.8.1.min');
require('checklist/vendor/ember-data');

require('checklist/templates/main_view');
require('checklist/templates/taxon_concept_view');

Ember.ENV.CP_DEFAULT_CACHEABLE = true;
Ember.ENV.VIEW_PRESERVES_CONTEXT = true;
Checklist = Ember.Application.create({
    ready: function() {}
});

require('checklist/models/taxon_concept');
require('checklist/models/index');
require('checklist/models/history');
require('checklist/models/taxon_name');
require('checklist/models/country');
require('checklist/models/region');
require('checklist/models/appendix');

require('checklist/sapi_adapter');

Checklist.store = DS.Store.create({
  revision: 4,
  adapter: Checklist.SAPIAdapter.create({
    bulkCommit: false,
    url: window.BACKEND_URL
  })
});

require('checklist/controllers/taxon_concept_controller');
require('checklist/controllers/countries_controller');
require('checklist/controllers/regions_controller');
require('checklist/controllers/appendices_controller');
require('checklist/controllers/selected_filters_controller');

require('checklist/views/main_view');
require('checklist/views/checklist_form');
require('checklist/views/taxon_concept_list_view');
