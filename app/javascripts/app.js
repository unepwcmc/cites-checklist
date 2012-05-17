require('checklist/vendor/jquery-1.7.2');
require('checklist/vendor/ember-latest');
require('checklist/vendor/ember-data');
require('checklist/templates/main_view');

Ember.ENV.CP_DEFAULT_CACHEABLE = true;
Ember.ENV.VIEW_PRESERVES_CONTEXT = true;
Checklist = Ember.Application.create({
    ready: function() {}
});

Checklist.SAPIAdapter = DS.Adapter.extend({
  find: function(store, type, id) {
    var url = type.url;
    url = url.fmt(id);
    jQuery.getJSON(url, function(data) {
    // data is a Hash of key/value pairs. If your server returns a
    // root, simply do something like:
    // store.load(type, id, data.person)
    store.load(type, id, data);
    });
  },
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
  //adapter: DS.RESTAdapter.create({ bulkCommit: false })
  adapter: Checklist.SAPIAdapter.create({
    bulkCommit: false,
    url: 'http://localhost:3000/'/*,
    ajax: function(url, type, hash) {
      console.log(arguments);
    }*/
  })
});
/*
DS.RESTAdapter.create({
    
    ajax: function(url, type, hash) {
        console.log(arguments);
    },
    //url: 'http://sapi.unepwcmc-005.vm.brightbox.net'
    url: 'http://localhost:3000'
  })
*/
Checklist.taxonTree = DS.Model.extend({
  title: null
});

Checklist.taxonTree.reopenClass({
  url: 'checklists'
});

Checklist.checklistController = Ember.ArrayController.create({
  content: Checklist.store.findAll(Checklist.taxonTree),
});

Checklist.MainView = Ember.View.extend({
  templateName: 'main_view'
});
