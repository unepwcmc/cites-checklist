= CITES Checklist

== Development

We're using ember.js with ember-data to handle REST backend requests.

Here are some naming conventions to follow:
  http://www.emberist.com/2012/04/09/naming-conventions.html

Avoid using absolute object paths (e.g. MyApp.currentUserController.user) in classes. Explanation:
  http://www.emberist.com/2012/04/30/absolute-paths-in-classes.html

=== Ember resources

The rake pipeline setup taken from here:
  https://github.com/emberjs/todos
A skeleton app for rake pipeline:
  https://github.com/interline/ember-skeleton
Tutorial Jan 2012
  http://www.cerebris.com/blog/2012/01/24/beginning-ember-js-on-rails-part-1/
Links to resources Feb 2012
  http://tomdale.net/2012/02/ember-js-resources/

=== Important Vendor Note

We are using a customised version of Twitter Bootstrap Typeahead. There
should be little need to upgrade in the future due to the simplicity of
the library, however should it be necessary then a good read through
`bootstrap.js` beforehand is required to see what needs to be kept.

== Setup

Assets are pre-compiled with [rake
pipeline](https://github.com/livingsocial/rake-pipeline) and served
statically:

    bundle exec rakep build

For development use the built in server:

    bundle exec rakep server

As this is a pre-compiled static page setup that uses HTML5 pushState,
you need to setup your server to redirect requests to the index page. In
Apache this should work automatically with the included `.htaccess`
file, however for nginx you must add a rule to your server directive to
do this:

    rewrite ^(.+)$ /index.html last;

You can turn off pushState, however, in
[config.js](https://github.com/unepwcmc/cites-checklist/blob/master/app/javascripts/config.js).
