require('checklist/config');

minispade.requireAll(/vendor\/jquery/);
require('checklist/vendor/custom-form-elements');
require('checklist/vendor/bootstrap-typeahead');

require('checklist/vendor/ember');
require('checklist/vendor/ember-data');

minispade.requireAll(/templates/);

Ember.ENV.CP_DEFAULT_CACHEABLE = true;
Ember.ENV.VIEW_PRESERVES_CONTEXT = true;
Checklist = Ember.Application.create({
  ApplicationController: Ember.Controller.extend({}),
  ApplicationView: Ember.View.extend({
    templateName: 'application_view'
  })
});

minispade.requireAll(/helpers/);
minispade.requireAll(/adapters/);

Checklist.store = DS.Store.create({
  revision: 4,
  adapter: Checklist.SAPIAdapter.create({
    bulkCommit: false,
    url: window.BACKEND_URL
  })
});

console.log(Checklist.Helpers.storage());
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

require('checklist/routers/router');

Checklist.initialize();
