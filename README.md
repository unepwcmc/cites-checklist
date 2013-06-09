# CITES Checklist

## Development

We're using Ember.js with Ember Data to handle REST backend requests.  

### Old Ember resources - relevant to the version of Ember used in the Checklist

* [Rake Pipeline setup example](https://github.com/emberjs/todos)
* [A skeleton app for rake pipeline](https://github.com/interline/ember-skeleton)
* [Tutorial Jan 2012](http://www.cerebris.com/blog/2012/01/24/beginning-ember-js-on-rails-part-1/)
* [Links to resources Feb 2012]( http://tomdale.net/2012/02/ember-js-resources/)

### More up to date Ember resources - relevant to the much needed upgrade

* [Building an Ember app with RailsAPI](http://reefpoints.dockyard.com/ember/2013/01/07/building-an-ember-app-with-rails-api-part-1.html)
* [Ember Official Getting Started Guide ](http://emberjs.com/guides/getting-started)

### Important Vendor Note

We are using a customised version of Twitter Bootstrap Typeahead. There
should be little need to upgrade in the future due to the simplicity of
the library, however should it be necessary then a good read through
`bootstrap.js` beforehand is required to see what needs to be kept.

## Setup

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
