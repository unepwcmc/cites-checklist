require('checklist/vendor/jquery-1.7.2');
require('checklist/vendor/ember-0.9.6');
//require('checklist/vendor/ember-data-latest');
require('checklist/templates/main_view');

//Ember.ENV.VIEW_PRESERVES_CONTEXT = true;
Checklist = Ember.Application.create();
/*
Checklist.store = DS.Store.create({
  revision: 4,
  adapter: DS.RESTAdapter.create({ bulkCommit: false })
});
*/
