Checklist.SavedSearchView = Em.View.extend({
  templateName: "saved_search",
  filtersController: null,

  save: function(view) {
    var val = $(view.target).siblings('input').val();
    if (!val) return;

    var saved_search = Checklist.local_store.createRecord(
      Checklist.SavedSearch,
      {
        id: Checklist.Helpers.generateId(),
        name: val,
        filters: JSON.stringify(this.get('filtersController').toParams()),
      }
    );

    Checklist.local_store.commit();
  },
});
