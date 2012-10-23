Checklist.CONFIG = {
  // Please do not omit the trailing slash
  backend_url: "http://sapi.wcmc.cyanoryx.com/",

  // Single page URL type for Ember to use:
  //   history - pushState
  //   hash    - location.hash
  url_type: 'hash',

  default_locale: 'en'
}

Em.I18n.set('currentLocale', Checklist.CONFIG.default_locale);
CLDR.defaultLanguage = Checklist.CONFIG.default_locale;
