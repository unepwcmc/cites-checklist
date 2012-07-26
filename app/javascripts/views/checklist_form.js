Checklist.ChecklistForm = Em.View.extend({
  tagName: 'form',
  controller: null,
  filtersController: null,
  countryFilter: null,
  regionFilter: null,
  taxonomicLayoutSwitch: null,

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
    $(event.target).attr('href', this.get('indexPdfLink'));
  },

  downloadCustomHistoryPdf: function(event) {
    $(event.target).attr('href', this.get('historyPdfLink'));
  }

});
