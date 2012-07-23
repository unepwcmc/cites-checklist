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

      // Update the search PDF download link to include user attributes
      $('#search-pdf-link').attr('href', this.get('searchPdfLink'));
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

    searchPdfLink: function(){
      console.log($.param(this.get('filtersController').toParams()));
      return Checklist.store.adapter.url +
      Checklist.Index.urlFromParams(
        $.extend(
          this.get('filtersController').toParams(),
          {'format' : 'pdf'}
        )
      );
    }.property().volatile()
});
