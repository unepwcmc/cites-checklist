Checklist.SavedSearchView = Em.View.extend({
  templateName: "saved_search",

  save: function(view) {
    // Ember's inheritance isn't ideal for this situation, so
    // unfortunately we don't get to use the fancy isInvisible and
    // beforeInvisible, etc. methods.
    $(view.target).toggle();
    $(view.target).siblings('fieldset').fadeToggle();
  },
});

Checklist.SavedSearchTextField = Em.TextField.extend({
  value: '',

  insertNewline: function(view) {
    var val = $(view.target).val();
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

    $(view.target).parent().toggle();
    $(view.target).parent().siblings('a').fadeToggle();

    $(view.target).val('');
  },
});
