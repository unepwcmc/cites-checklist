Checklist.SavedSearchView = Em.View.extend({
  filtersController: null,

  save: function(event) {
    event.preventDefault();

    var saved_seach = Checklist.local_store.createRecord(
      Checklist.SavedSearch,
      {id:'test',filters:'sdfsdgds'}
    );

    Checklist.local_store.commit();
  }
});
