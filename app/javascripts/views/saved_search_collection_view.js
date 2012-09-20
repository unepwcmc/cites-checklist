Checklist.SavedSearchCollectionView = Ember.CollectionView.extend({
  tagName: 'ul',
  content: [],
  itemViewClass: Ember.View.extend({
    contextBinding: 'content',
    templateName: 'saved_search_collection',
    load: function(event) {
      var selection = this.get('content').get('id');
      var record    = Checklist.local_store.find(Checklist.SavedSearch, selection);
      var filters   = JSON.parse(record.get('filters'));

      var params = $.param(filters);

      Checklist.get('router').transitionTo('search',{params: params});
    },
    delete_search: function(event) {
      var id     = this.get('content').get('id');
      var search = Checklist.local_store.find(Checklist.SavedSearch, id);

      search.deleteRecord();
      Checklist.local_store.commit();
    }
  })
});
