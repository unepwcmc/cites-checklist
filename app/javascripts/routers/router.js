Checklist.Router = Ember.Router.extend({
  location: 'hash',

  root: Ember.Route.extend({
    home: Ember.Route.extend({
      route: '/',
      downloadCustomIndexPdf: Ember.State.transitionTo('customIndexPdf'),
      connectOutlets: function(router, event) {}
    }),
    search: Ember.Route.extend({
      route: '/search/:params',
      connectOutlets: function(router, event) {
        params = Checklist.Helpers.deparam(event.params);

        router.get('filtersController').fromParams(params);
      },
    }),
    /*
    customIndexPdf: Ember.Route.extend({
      route: '/taxon_concepts.pdf',
      connectOutlets: function(router, event) {
        console.log('hello?)');
        //window.location = this.get('indexPdfLink')
        var tmp = Checklist.Index.urlFromParams(
          $.extend(
            router.get('filtersController').toParams(),
            {'format' : 'pdf'}
          )
        );
        console.log(tmp);
        //router.get('applicationController').connectOutlet('post', post);
      }
    })
    */
  })
});
