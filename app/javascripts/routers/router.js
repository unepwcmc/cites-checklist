Checklist.Router = Ember.Router.extend({
  location: Checklist.CONFIG.url_type,
  //enableLogging: true,

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
        Ember.set('Em.I18n.currentLocale', locale);
        window.console && console.log('CURRENT LOCALE IS:', Em.I18n.currentLocale);
      },

      index: Ember.Route.extend({
        route: '/',
        connectOutlets: function(router, event) {
          var geoEntitiesController = router.get('geoEntitiesController');
          geoEntitiesController.load();
          var filtersController = router.get('filtersController');
          filtersController.set('geoEntitiesController', geoEntitiesController);

          var params = router.get('filtersController').toParams();
          router.get('taxonConceptController').refresh(params);

          router.get('applicationController').connectOutlet({
            outletName: 'header', viewClass: Checklist.MainHeaderView
          });
          router.get('applicationController').connectOutlet({
            outletName: 'main', viewClass: Checklist.MainView
          });
        }
      }),

      search: Ember.Route.extend({
        route: '/search/:params',
        connectOutlets: function(router, event) {
          var geoEntitiesController = router.get('geoEntitiesController');
          geoEntitiesController.load();
          var filtersController = router.get('filtersController');
          filtersController.set('geoEntitiesController', geoEntitiesController);

          var params = Checklist.Helpers.deparam(event.params);
          router.get('filtersController').fromParams(params);
          router.get('taxonConceptController').refresh(params);

          if (event.redraw === undefined || event.redraw) {
            router.get('applicationController').connectOutlet({
              outletName: 'header', viewClass: Checklist.MainHeaderView
            });
          }
          router.get('applicationController').connectOutlet({
            outletName: 'main', viewClass: Checklist.MainView
          });
        }
      }),

      about: Ember.Route.extend({
        route: '/about',
        connectOutlets: function(router, event) {
          Checklist.StaticPage.getCompiledTemplate('about_page').then(function(template) {
            router.get('applicationController').connectOutlet({
              outletName: 'header', viewClass: Checklist.AboutHeaderView
            });
            router.get('applicationController').connectOutlet({
              outletName: 'main', viewClass: Checklist.AboutView
            });
          }, function(error) {
            window.console && console.log(error);
            router.transitionTo('index');
          });
        }
      }),

      termsOfUse: Ember.Route.extend({
        route: '/terms-of-use',
        connectOutlets: function(router, event) {
          Checklist.StaticPage.getCompiledTemplate('terms_of_use_page').then(function(template) {
            router.get('applicationController').connectOutlet({
              outletName: 'header', viewClass: Checklist.TermsOfUseHeaderView
            });
            router.get('applicationController').connectOutlet({
              outletName: 'main', viewClass: Checklist.TermsOfUseView
            });
          }, function(error) {
            window.console && console.log(error);
            router.transitionTo('index');
          });
        }
      }),

      doLocaleEN: function(router, event) {
        var newLocale = 'en';
        var newState;
        if (router.get('currentState.name') == 'search'){
          newState = 'index';
        } else {
          newState = router.get('currentState.name');
        }
        var geoEntitiesController = router.get('geoEntitiesController');
        geoEntitiesController.set('needsReload', true)
        router.transitionTo(newState, {locale: newLocale});
      },

      doLocaleES: function(router, event) {
        var newLocale = 'es';
        var newState;
        if (router.get('currentState.name') == 'search'){
          newState = 'index';
        } else {
          newState = router.get('currentState.name');
        }
        var geoEntitiesController = router.get('geoEntitiesController');
        geoEntitiesController.set('needsReload', true)
        router.transitionTo(newState, {locale: newLocale});
      },

      doLocaleFR: function(router, event) {
        var newLocale = 'fr';
        var newState;
        if (router.get('currentState.name') == 'search'){
          newState = 'index';
        } else {
          newState = router.get('currentState.name');
        }
        var geoEntitiesController = router.get('geoEntitiesController');
        geoEntitiesController.set('needsReload', true)
        router.transitionTo(newState, {locale: newLocale});
      }
    }),

    doHome: function(router, event) {
      router.transitionTo('index');
    },

    doAbout: function(router, event) {
      router.transitionTo('about');
    },

    doTermsOfUse: function(router, event) {
      router.transitionTo('termsOfUse');
    }
  })
});
