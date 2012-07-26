Checklist.ChecklistForm = Em.View.extend({
  tagName: 'form',
  controller: null,
  filtersController: null,
  countryFilter: null,
  regionFilter: null,
  taxonomicLayoutSwitch: null,

    save_search: function(view) {
      var saved_search = Checklist.local_store.createRecord(
        Checklist.SavedSearch,
        {
          id: this.generateId(),
          name: $('#save_search_name').val(),
          filters: JSON.stringify(this.get('filtersController').toParams()),
        }
      );

      Checklist.local_store.commit();
    },

    // Generates a 4 character, unique identifier.
    generateId: function() {
      return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    },

    submit: function(event) {
      event.preventDefault();

    this.get('controller').set(
      'content',
      Checklist.store.find(
        Checklist.Index, this.get('filtersController').toParams()
      )
    )
  },

  indexPdfLink: function(){
    return Checklist.store.adapter.url +
    Checklist.Index.urlFromParams(
      $.extend(
        this.get('filtersController').toParams(),
        {'format' : 'pdf'}
      )
    );
  }.property().volatile(),

  historyPdfLink: function(){
    return Checklist.store.adapter.url +
    Checklist.History.urlFromParams(
      $.extend(
        this.get('filtersController').toParams(),
        {'format' : 'pdf'}
      )
    );
  }.property().volatile(),

  downloadCustomIndexPdf: function(event) {
    window.location = this.get('indexPdfLink')
  },

  downloadCustomHistoryPdf: function(event) {
    window.location = this.get('historyPdfLink');
  }

});
