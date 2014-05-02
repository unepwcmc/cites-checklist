Checklist.MainView = Ember.View.extend({
  tagName: 'section',
  templateName: 'main_view',

  classNames: ['main'],

  landingColorboxConfig: {
    inline: true,
    transition: 'fade',
    close: 'x',
    opacity: 0.8,
    fixed: true,
    maxWidth: 675,
    innerWidth: 675,
    open: true,
    className: 'landing',
    onClosed: function(event) {
      $.cookie("Checklist.CONFIG.visited", true);
    }
  },

  didInsertElement: function() {
    var target = document.getElementById('loading');
    var spinner = new Spinner(Checklist.CONFIG.spinner).spin(target);

    if (!$.cookie("Checklist.CONFIG.visited")) {
      $('#landing-btn').colorbox(this.get('landingColorboxConfig'));
    }
  },

  closeLandingBox: function(event) {
    $.colorbox.close();
  },

  doLocaleEN: function(event) {
    $.colorbox.remove();
    Checklist.router.transitionTo('home.index', {locale: 'en'});
    $('#landing-btn').colorbox(this.get('landingColorboxConfig'));
  },

  doLocaleES: function(event) {
    $.colorbox.remove();
    Checklist.router.transitionTo('home.index', {locale: 'es'});
    $('#landing-btn').colorbox(this.get('landingColorboxConfig'));
  },

  doLocaleFR: function(event) {
    $.colorbox.remove();
    Checklist.router.transitionTo('home.index', {locale: 'fr'});
    $('#landing-btn').colorbox(this.get('landingColorboxConfig'));
  }

});
