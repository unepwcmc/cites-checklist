Checklist.GeoEntitiesController = Ember.ArrayController.extend({
  regions: null,
  countries: null,

  load: function(){
    if (!this.get('regions.isLoaded')){
      this.set('regions', Checklist.GeoEntity.find({geo_entity_types_set: '1'}));
    }
    if (!this.get('countries.isLoaded')){
      this.set('countries', Checklist.GeoEntity.find({geo_entity_types_set: '2'}));
    }
  }

});
