require('checklist/config');
require('checklist/vendor/jquery-1.7.2');
require('checklist/vendor/ember-latest');
require('checklist/vendor/ember-data');

require('checklist/templates/main_view');

Ember.ENV.CP_DEFAULT_CACHEABLE = true;
Ember.ENV.VIEW_PRESERVES_CONTEXT = true;
Checklist = Ember.Application.create({
    ready: function() {}
});

require('checklist/models/taxon_concept');
require('checklist/models/taxon_name');
require('checklist/models/country');

require('checklist/sapi_adapter');

Checklist.store = DS.Store.create({
  revision: 4,
  adapter: Checklist.SAPIAdapter.create({
    bulkCommit: false,
    url: window.BACKEND_URL
  })
});

require('checklist/controllers/taxon_concept_controller');
require('checklist/controllers/country_controller');
require('checklist/controllers/selected_country_controller');

require('checklist/views/main_view');
require('checklist/views/country_select');
