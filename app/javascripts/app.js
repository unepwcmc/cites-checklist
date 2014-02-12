minispade.requireAll(/vendor\/jquery/);
require('checklist/vendor/custom-form-elements');
require('checklist/vendor/bootstrap-typeahead');
require('checklist/vendor/spin.min');

require('checklist/vendor/ember');
require('checklist/vendor/ember-data');

require('checklist/vendor/cldr-1.0.0');
require('checklist/vendor/i18n');

minispade.requireAll(/locales/);
minispade.requireAll(/templates/);

Ember.ENV.CP_DEFAULT_CACHEABLE = true;
Ember.ENV.VIEW_PRESERVES_CONTEXT = true;
Checklist = Ember.Application.create({
  ApplicationController: Ember.Controller.extend({}),
  ApplicationView: Ember.View.extend({
    templateName: 'application_view'
  })
});

require('checklist/config');

minispade.requireAll(/helpers/);
minispade.requireAll(/adapters/);

Checklist.store = DS.Store.create({
  revision: 4,
  adapter: Checklist.SAPIAdapter.create({
    bulkCommit: false,
    url: Checklist.CONFIG.backend_url
  })
});

Checklist.local_store = DS.Store.create({
  revision: 4,
  adapter: Checklist.searchAdapter.create({
    bulkCommit: false,
    useLocalStorage: Checklist.Helpers.storage(),
    jQuery: $
  })
});

minispade.requireAll(/views/);
minispade.requireAll(/models/);
minispade.requireAll(/controllers/);

Checklist.download_store = DS.Store.create({
  revision: 4,
  adapter: DS.RESTAdapter.create({
    bulkCommit: false,
    mappings: {
      downloads: Checklist.Download
    },
    url: "http://sapi.wcmc.cyanoryx.com"
  })
});

require('checklist/routers/router');

Checklist.initialize();
