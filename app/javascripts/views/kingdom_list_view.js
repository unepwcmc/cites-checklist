Checklist.KingdomListView = Ember.View.extend({
  templateName: 'kingdom_list_view',
  content: null,
  taxonConceptsController: null,
  filtersController: null,

  showAnimalia: function(){
    return this.content.get('animaliaPresent');
  }.property(),
  showPlantae: function(){
    return this.content.get('plantaePresent');
  }.property(),
  showNext: function(){
    return this.filtersController.get('page') <
      (this.content.get('total_cnt') / this.filtersController.get('per_page'));
  }.property(),
  showPrev: function(){
    return this.filtersController.get('page') > 0
  }.property(),
  nextPage: function(){
    var currentPage = this.filtersController.get('page');
    if (this.get('showNext')){
      this.filtersController.set('page', currentPage + 1);
      this.get('taxonConceptsController').set(
        'content',
        Checklist.store.find(
          Checklist.Index, this.get('filtersController').toParams()
        )
      )
    }
  },
  prevPage: function(){
    var currentPage = this.filtersController.get('page');
    if (this.get('showPrev')){
      this.filtersController.set('page', currentPage - 1);
      this.get('taxonConceptsController').set(
        'content',
        Checklist.store.find(
          Checklist.Index, this.get('filtersController').toParams()
        )
      )
    }
  }
});
