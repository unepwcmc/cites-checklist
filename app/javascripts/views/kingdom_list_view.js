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
    return Checklist.get('router').get('filtersController').get('page') <
      (this.content.get('total_cnt') / Checklist.get('router').get('filtersController').get('per_page'));
  }.property(),
  showPrev: function(){
    return Checklist.get('router').get('filtersController').get('page') > 0
  }.property(),
  nextPage: function(){
    var currentPage = Checklist.get('router').get('filtersController').get('page');
    if (this.get('showNext')){
      Checklist.get('router').get('filtersController').set('page', currentPage + 1);
      Checklist.get('router').get('taxonConceptController').set(
        'content',
        Checklist.store.find(
          Checklist.Index, Checklist.get('router').get('filtersController').toParams()
        )
      )
    }
  },
  prevPage: function(){
    var currentPage = Checklist.get('router').get('filtersController').get('page');
    if (this.get('showPrev')){
      Checklist.get('router').get('filtersController').set('page', currentPage - 1);
      Checklist.get('router').get('taxonConceptController').set(
        'content',
        Checklist.store.find(
          Checklist.Index, Checklist.get('router').get('filtersController').toParams()
        )
      )
    }
  }
});
