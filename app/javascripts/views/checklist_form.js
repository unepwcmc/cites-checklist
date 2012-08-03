Checklist.ChecklistForm = Em.View.extend({
  tagName: 'form',
  controller: null,
  filtersController: null,
  countryFilter: null,
  regionFilter: null,
  taxonomicLayoutSwitch: null,

  submit: function(event) {
    event.preventDefault();

    this.get('filtersController').set('page', 0);
    this.get('controller').set(
      'content',
      Checklist.store.find(
        Checklist.Index, this.get('filtersController').toParams()
      )
    )

    Checklist.get('router').get('savedSearchController').set('selection', null);

    var filters = this.get('filtersController').toParams();
    var params = $.param(filters);

    Checklist.get('router').transitionTo('search',{params: params});
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
