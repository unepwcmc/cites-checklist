Checklist.HigherTaxaCollectionView = Ember.CollectionView.extend({
  tagName: 'ul',
  classNames: ['tags'],

  itemViewClass: Ember.View.extend({
    contextBinding: 'content',
    templateName: 'higher_taxa',

    search: function() {
      var filtersController = Checklist.get('router').get('filtersController');

      // Keep the taxonomic view, common name languages, etc. in the URL
      var params = $.extend(
        filtersController.toParams(),
        {
          scientific_name: this.content
        }
      );

      Checklist.get('router').transitionTo('search', {params: $.param(params)});
    }
  })
});
