Checklist.CONFIG = {
  // Please do not omit the trailing slash
  backend_url: "http://localhost:3000",

  // Single page URL type for Ember to use:
  //   history - pushState
  //   hash    - location.hash
  url_type: 'hash',

  default_locale: 'en',

  colorbox: {
    inline: true,
    transition: 'none',
    close: 'x',
    maxWidth: 470,
    innerWidth: 470,
    opacity: 0.8,
    fixed: true
  }
}

Em.I18n.set('currentLocale', Checklist.CONFIG.default_locale);
CLDR.defaultLanguage = Checklist.CONFIG.default_locale;
