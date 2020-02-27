Checklist.CONFIG = {
  // Please do not omit the trailing slash
  // Update this for staging and production environments
  backend_url: "http://localhost:3000/checklist/",

  // Single page URL type for Ember to use:
  //   history - pushState
  //   hash    - location.hash
  url_type: 'hash',

  default_locale: 'en',

  colorbox: {
    inline: true,
    transition: 'fade',
    close: 'x',
    maxWidth: 470,
    innerWidth: 470,
    opacity: 0.8,
    fixed: true
  },

  spinner: {
    lines: 13, // The number of lines to draw
    length: 2, // The length of each line
    width: 4, // The line thickness
    radius: 10, // The radius of the inner circle
    corners: 1, // Corner roundness (0..1)
    rotate: 0, // The rotation offset
    color: '#000', // #rgb or #rrggbb
    speed: 1, // Rounds per second
    trail: 60, // Afterglow percentage
    shadow: false, // Whether to render a shadow
    hwaccel: false, // Whether to use hardware acceleration
    className: 'spinner', // The CSS class to assign to the spinner
    zIndex: 900, // The z-index (defaults to 2000000000)
    top: 'auto', // Top position relative to parent in px
    left: 'auto' // Left position relative to parent in px
  }
};

Em.I18n.translations = Em.I18n.locales[Checklist.CONFIG.default_locale];
Em.I18n.currentLocale = Checklist.CONFIG.default_locale;
