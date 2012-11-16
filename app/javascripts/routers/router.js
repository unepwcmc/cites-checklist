Checklist.Router = Ember.Router.extend({
  location: Checklist.CONFIG.url_type,

  root: Ember.Route.extend({
    home: Ember.Route.extend({
      route: '/',
      connectOutlets: function(router, event) {
        var params = router.get('filtersController').toParams();
        router.get('taxonConceptController').refresh(params);

        router.get('applicationController').connectOutlet({outletName: 'header', viewClass: Checklist.MainHeaderView});
        router.get('applicationController').connectOutlet({outletName: 'main', viewClass: Checklist.MainView});
      }
    }),

    search: Ember.Route.extend({
      route: '/search/:params',
      connectOutlets: function(router, event) {
        var params = Checklist.Helpers.deparam(event.params);

        router.get('filtersController').fromParams(params);
        router.get('taxonConceptController').refresh(params);

        router.get('applicationController').connectOutlet({outletName: 'header', viewClass: Checklist.MainHeaderView});
        router.get('applicationController').connectOutlet({outletName: 'main', viewClass: Checklist.MainView});
      }
    }),
    search_without_render: Ember.Route.extend({
      route: '/search/:params',
      connectOutlets: function(router, event) {
        var params = Checklist.Helpers.deparam(event.params);

        router.get('filtersController').fromParams(params);
        router.get('taxonConceptController').refresh(params);

        router.get('applicationController').connectOutlet({outletName: 'main', viewClass: Checklist.MainView});
      }
    }),

    doAbout: function(router, event) {
      router.transitionTo('about');
    },
    about: Ember.Route.extend({
      route: '/about',
      connectOutlets: function(router, event) {
        router.get('applicationController').connectOutlet({outletName: 'header', viewClass: Checklist.AboutHeaderView});
        router.get('applicationController').connectOutlet({outletName: 'main', viewClass: Checklist.AboutView});
      }
    })
  })
});
