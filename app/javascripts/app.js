minispade.requireAll(/vendor\/jquery/);
require('checklist/vendor/custom-form-elements');
require('checklist/vendor/bootstrap-typeahead');
require('checklist/vendor/spin.min');

require('checklist/vendor/ember');
require('checklist/vendor/ember-data');

// rather than include CLDR here, just a simple plural form implementation
// EN, ES, FR only ever have 'one' or 'other'
// 'zero' is for convenience

CLDR = {
  pluralForm: function myCustomInflector(n) {
    return n === 0 ? 'zero' : n === 1 ? 'one' : 'other';
  }
};

require('checklist/vendor/i18n');

Em.I18n.locales = {};

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

/*
 * Add an array primitive to Ember Data models
 */
DS.attr.transforms.array = {
  from: function(serialized) {
    return serialized;
  },
  to: function(deserialized) {
    return deserialized;
  }
};

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

require('checklist/static_page');
require('checklist/routers/router');

Checklist.initialize();
