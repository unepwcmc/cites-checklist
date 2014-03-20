Checklist.Router = Ember.Router.extend({
  location: Checklist.CONFIG.url_type,
  enableLogging: true,

  root: Ember.Route.extend({

    index: Ember.Route.extend({
      route: '/',
      connectOutlets: function(router, event) {
        router.transitionTo('home.index', {locale: Em.I18n.currentLocale});
      }
    }),

    home: Ember.Route.extend({
      route: '/:locale',
      connectOutlets: function(router, event) {
        var locale = event.locale;
        if (locale !== 'en' && locale !== 'es' && locale !== 'fr'){
          locale = 'en';
        }
        Em.I18n.translations = Em.I18n.locales[locale];
        Em.I18n.currentLocale = locale;
        console.log('CURRENT LOCALE IS:', Em.I18n.currentLocale);
        router.get('filtersController').set(
          'appendicesContent',
          Checklist.store.findQuery(Checklist.Appendix, {})
        );
      },

      index: Ember.Route.extend({
        route: '/',
        connectOutlets: function(router, event) {
          Checklist.LocationsLoader.load().then(
            function(locations){
              router.get('filtersController').set(
                'countriesContent', locations.countries
              );
              router.get('filtersController').set(
                'regionsContent', locations.regions
              );
              var params = router.get('filtersController').toParams();
              router.get('taxonConceptController').refresh(params);

              router.get('applicationController').connectOutlet({outletName: 'header', viewClass: Checklist.MainHeaderView});
              router.get('applicationController').connectOutlet({outletName: 'main', viewClass: Checklist.MainView});
            }, function(error){
              console.log(error);
            }
          );
        }
      }),

      search: Ember.Route.extend({
        route: '/search/:params',
        connectOutlets: function(router, event) {
          Checklist.LocationsLoader.load().then(
            function(locations){
              router.get('filtersController').set(
                'countriesContent', locations.countries
              );
              router.get('filtersController').set(
                'regionsContent', locations.regions
              );
              var params = Checklist.Helpers.deparam(event.params);

              router.get('filtersController').fromParams(params);
              router.get('taxonConceptController').refresh(params);

              if (event.redraw === undefined || event.redraw) {
                router.get('applicationController').connectOutlet({outletName: 'header', viewClass: Checklist.MainHeaderView});
              }
              router.get('applicationController').connectOutlet({outletName: 'main', viewClass: Checklist.MainView});
            }, function(error){
              console.log(error);
            }
          );
        }
      }),

      about: Ember.Route.extend({
        route: '/about',
        connectOutlets: function(router, event) {
          router.get('applicationController').connectOutlet({outletName: 'header', viewClass: Checklist.AboutHeaderView});
          router.get('applicationController').connectOutlet({outletName: 'main', viewClass: Checklist.AboutView});
        }
      }),

      termsOfUse: Ember.Route.extend({
        route: '/terms-of-use',
        connectOutlets: function(router, event) {
          router.get('applicationController').connectOutlet({outletName: 'header', viewClass: Checklist.TermsOfUseHeaderView});
          router.get('applicationController').connectOutlet({outletName: 'main', viewClass: Checklist.TermsOfUseView});
        }
      })
    }),

    doHome: function(router, event) {
      router.transitionTo('index');
    },

    doAbout: function(router, event) {
      router.transitionTo('about');
    },

    doTermsOfUse: function(router, event) {
      router.transitionTo('termsOfUse');
    },

    doLocaleEN: function(router) {
      router.transitionTo(router.get('currentPath'), {locale: 'en'});
    },

    doLocaleES: function(router) {
      router.transitionTo(router.get('currentPath'), {locale: 'es'});
    },

    doLocaleFR: function(router) {
      router.transitionTo(router.get('currentPath'), {locale: 'fr'});
    }
  })
});
