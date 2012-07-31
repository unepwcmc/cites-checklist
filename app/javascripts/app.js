require('checklist/config');
require('checklist/vendor/jquery-1.7.2');
require('checklist/vendor/ember');
require('checklist/vendor/ember-data');

require('checklist/templates/main_view');
require('checklist/templates/taxon_concept_view');
require('checklist/templates/kingdom_list_view');

Ember.ENV.CP_DEFAULT_CACHEABLE = true;
Ember.ENV.VIEW_PRESERVES_CONTEXT = true;
Checklist = Ember.Application.create({
  ApplicationController: Ember.Controller.extend({}),
  ApplicationView: Ember.View.extend({
    templateName: 'main_view'
  }),
});

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
Checklist.local_store = DS.Store.create({
  revision: 4,
  adapter: Checklist.searchAdapter.create({
    bulkCommit: false,
    storage_method: 'localStorage'
  })
});

require('checklist/views/saved_search_view');
require('checklist/views/main_view');
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
require('checklist/controllers/countries_controller');
require('checklist/controllers/regions_controller');
require('checklist/controllers/appendices_controller');
require('checklist/controllers/filters_controller');
require('checklist/controllers/saved_search_controller');

Checklist.Router = Ember.Router.extend({
    enableLogging: true,
    location: 'hash',

    root: Ember.Route.extend({
      home: Ember.Route.extend({
        route: '/',
        connectOutlets: function(router, event) {
        }
      }),
      doSearch: function(router, event) {
        params = router.get('filtersController').toParams();

        // Convert object to params

        router.transitionTo('search',{params: 'countries=dsgdfg'});
      },
      search: Ember.Route.extend({
        route: '/search/:params',
        connectOutlets: function(router, event) {
          var pairs = event.params.split('&');

          var params = new Object();
          pairs.forEach(function(item, i) {
            var key = item.split('=')[0];
            var val = item.split('=')[1];

            var values = val.split(',');

            params[key] = values;
          });

          router.get('filtersController').fromParams(params);
        },
      }),
    })
  });

Checklist.initialize();
