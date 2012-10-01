Checklist.Router = Ember.Router.extend({
  location: 'hash',

  root: Ember.Route.extend({
    home: Ember.Route.extend({
      route: '/',
      connectOutlets: function(router, event) {
        router.get('applicationController')
        .connectOutlet({
          viewClass: Checklist.MainView,
          controller: router.get('taxonConceptController'),
          context: Checklist.store.find(
            Checklist.Index, router.get('filtersController').toParams()
          )
        });
      }
    }),
    search: Ember.Route.extend({
      route: '/search/:params',
      connectOutlets: function(router, event) {
        params = Checklist.Helpers.deparam(event.params);
        router.get('filtersController').fromParams(params);

        router.get('applicationController')
        .connectOutlet({
          viewClass: Checklist.MainView,
          controller: router.get('taxonConceptController'),
          context: Checklist.store.find(
            Checklist.Index, params
          )
        });
      }
    }),
    doAbout: function(router, event) {
      router.transitionTo('about');
    },
    about: Ember.Route.extend({
      route: '/about',
      connectOutlets: function(router, event) {
        router.get('applicationController').connectOutlet({viewClass: Checklist.AboutView});
      }
    })
  })
});
