Checklist.GeoEntitiesController = Ember.ArrayController.extend({
  regions: null,
  countries: null,
  needsReload: false,

  load: function(){
    if (!this.get('regions.isLoaded') || this.get('needsReload')){
      this.set('regions', Checklist.GeoEntity.find({
        geo_entity_types_set: '1', locale: Em.I18n.currentLocale
      }));
    }
    if (!this.get('countries.isLoaded') || this.get('needsReload')){
      this.set('countries', Checklist.GeoEntity.find({
        geo_entity_types_set: '2', locale: Em.I18n.currentLocale
      }));
    }
    this.set('needsReload', false)
  }

});
