Checklist.SavedSearchCollectionView = Ember.CollectionView.extend({
  tagName: 'ul',
  content: [],
  itemViewClass: Ember.View.extend({
    contextBinding: 'content',
    templateName: 'saved_search_collection',

    delete_search: function(event) {
      var id     = this.get('content').get('id');
      var search = Checklist.local_store.find(Checklist.SavedSearch, id);

      search.deleteRecord();
      Checklist.local_store.commit();
    },

    click: function(event) {
      if ($(event.target).hasClass('delete')) return;

      var router                 = Checklist.get('router');
      var filtersController      = router.get('filtersController');
      var taxonConceptController = router.get('taxonConceptController');

      var selection = this.get('content').get('id');
      var record    = Checklist.local_store.find(Checklist.SavedSearch, selection);
      var filters   = JSON.parse(record.get('filters'));

      taxonConceptController.refresh(filters);
    }
  })
});
