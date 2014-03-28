Checklist.LocationsLoader = {
  load: function(){
    var promise = new RSVP.Promise();
    promise.resolve({
      countries: Checklist.store.findQuery(
        Checklist.Country, {geo_entity_types_set: 2, locale: Em.I18n.currentLocale}
      ),
      regions: Checklist.store.findQuery(
        Checklist.Country, {geo_entity_types_set: 1, locale: Em.I18n.currentLocale}
      )
    });
    return promise;
  }
}