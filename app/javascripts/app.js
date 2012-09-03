require('checklist/config');
require('checklist/vendor/jquery-1.7.2');
require('checklist/vendor/jcf');
require('checklist/vendor/jquery.cookie');
require('checklist/vendor/ember');
require('checklist/vendor/ember-data');
require('checklist/vendor/bootstrap');
require('checklist/vendor/jquery.main');

require('checklist/templates/application_view');
require('checklist/templates/main_view');
require('checklist/templates/pdf_download_view');
require('checklist/templates/taxon_concept_view');
require('checklist/templates/kingdom_list_view');
require('checklist/templates/appendix_form');
require('checklist/templates/saved_search_collection');
require('checklist/templates/saved_search');

Ember.ENV.CP_DEFAULT_CACHEABLE = true;
Ember.ENV.VIEW_PRESERVES_CONTEXT = true;
Checklist = Ember.Application.create({
  ApplicationController: Ember.Controller.extend({}),
  ApplicationView: Ember.View.extend({
    templateName: 'application_view'
  }),
});

require('checklist/helpers/main');

require('checklist/sapi_adapter');
require('checklist/search_adapter');

Checklist.store = DS.Store.create({
  revision: 4,
  adapter: Checklist.SAPIAdapter.create({
    bulkCommit: false,
    url: window.BACKEND_URL
  })
});

// Choose between cookies or localStorage for saved searches, depending
// on availability
// TODO refactor local_store to just use a boolean
var method = '';
if (Checklist.Helpers.storage) {
  method = 'localStorage';
}

Checklist.local_store = DS.Store.create({
  revision: 4,
  adapter: Checklist.searchAdapter.create({
    bulkCommit: false,
    storage_method: method,
    jQuery: $
  })
});

require('checklist/views/saved_search_collection_view');
require('checklist/views/saved_search_view');
require('checklist/views/appendix_form_view');
require('checklist/views/main_view');
require('checklist/views/pdf_download_view');
require('checklist/views/checklist_form');
require('checklist/views/kingdom_list_view');
require('checklist/views/taxon_concept_list_view');

require('checklist/models/taxon_concept');
require('checklist/models/index');
require('checklist/models/history');
require('checklist/models/taxon_name');
require('checklist/models/country');
require('checklist/models/region');
require('checklist/models/appendix');
require('checklist/models/saved_search');

require('checklist/controllers/taxon_concept_controller');
require('checklist/controllers/filters_controller');
require('checklist/controllers/saved_search_controller');

require('checklist/routers/router');

Checklist.initialize();
