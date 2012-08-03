/*
 * ember-data adapter for localStorage and cookies
 *
 * Based on thomasboyt's fork of ember-data
 *   https://github.com/thomasboyt/data
 */
Checklist.searchAdapter = DS.Adapter.extend({

  createRecord: function(store, type, model) {
    var item = model.toJSON({associations: true});

    this.storage.setById(this.storage_method, type, model.get('id'), item);
    store.didCreateRecord(model, item);
  },
  updateRecord: function(store, type, model) {
    throw "updateRecord is not implemented";
  },
  deleteRecord: function(store, type, model) {
    var id   = model.get('id');
    var item = model.toJSON({associations: true});

    var records = this.storage.getAll(this.storage_method, type);
    records.forEach(function(record, i) {
      if (record.id == id) {
        records.splice(i,1);
        return;
      }
    });

    this.storage.setAll(this.storage_method, type, records);

    store.didDeleteRecord(model, item);
  },

  find: function(store, type, id) {
    store.load(type, this.storage.getById(this.storage_method, id));
  },
  findAll: function(store, type) {
    store.loadMany(type, this.storage.getAll(this.storage_method, type));
  },

  // this.storage is an interface between the ember-data library methods
  // and localStorage/cookies
  //
  // Rather than using multiple storage buckets, the adapter uses the
  // model name as a namespace and stores all key/values in stringified
  // JSON in a single bucket.
  storage: {
    getById: function(method, type, id) {
      var values = this.getAll(method, type);

      values.forEach(function(item) {
        if (item.id == id) return item;
      });
    },

    getAll: function(method, type) {
      if (method == 'localStorage') {
        var value = localStorage.getItem(type);
      } else {
        var value = jQuery.cookie(type);
      }

      return JSON.parse(value || 'null') || [];
    },

    setById: function(method, type, id, value) {
      var values = this.getAll(method, type);

      // Iterate over the stored valuese and look to see if the ID
      // already exists, and mark the index for replacement if so
      var index = -1;
      values.forEach(function(item,i) {
        if (item.id == id) {
          index = i;
          return; // Remember, as I didn't, that return breaks out of loops in jQuery.forEach
        }
      });

      if (index >= 0) {
        values[index] = value;
      } else {
        // Append the item to the array if its ID doesn't already exist
        values.push(value);
      }

      this.setAll(method, type, values);
    },

    setAll: function(method, type, value) {
      if (method == 'localStorage') {
        localStorage.setItem(type, JSON.stringify(value));
      } else {
        jQuery.cookie(type, JSON.stringify(value));
      }
    }
  }

});
