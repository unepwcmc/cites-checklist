Checklist.SavedSearchView = Em.View.extend({
  templateName: "saved_search",

  save: function(view) {
    // Ember's inheritance isn't ideal for this situation, so
    // unfortunately we don't get to use the fancy isInvisible and
    // beforeInvisible, etc. methods.
    $(view.target).hide();
    $(view.target).siblings('fieldset').fadeIn();
  }
});

Checklist.SavedSearchTextField = Em.TextField.extend({
  value: '',

  keyUp: function(e) {
    this.interpretKeyEvents(e);
    if (e.keyCode == 27) {
      this.hide(e);
    }
  },
  focusOut: function(event) {
    this.hide(event);
  },
  insertNewline: function(view) {
    var val = $(view.target).val();
    if (!val) return;

    var saved_search = Checklist.local_store.createRecord(
      Checklist.SavedSearch,
      {
        id: Checklist.Helpers.generateId(),
        name: val,
        filters: JSON.stringify(this.get('filtersController').toParams())
      }
    );

    Checklist.local_store.commit();

    this.hide(view);
  },

  hide: function(view) {
    $(view.target).parent().hide();
    $(view.target).parent().siblings('a').fadeIn();

    $(view.target).val('');
  }
});
