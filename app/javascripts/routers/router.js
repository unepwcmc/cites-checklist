Checklist.Router = Ember.Router.extend({
  location: 'hash',

  root: Ember.Route.extend({
    home: Ember.Route.extend({
      route: '/',
      connectOutlets: function(router, event) {}
    }),
    search: Ember.Route.extend({
      route: '/search/:params',
      connectOutlets: function(router, event) {
        params = Checklist.Helpers.deparam(event.params);

        router.get('filtersController').fromParams(params);
      },
    }),
  })
});
