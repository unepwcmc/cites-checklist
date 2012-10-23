/* =============================================================
 * bootstrap-typeahead.js v2.0.4
 * http://twitter.github.com/bootstrap/javascript.html#typeahead
 * =============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */


!function($){

  "use strict"; // jshint ;_;


 /* TYPEAHEAD PUBLIC CLASS DEFINITION
  * ================================= */

 /* NOTICE
  *
  * This version of Bootstrap Typeahead has been modified in a few ways.
  *
  * Firstly, a new method has been introduced: the parser. The parser is
  * a function that is executed on the source data before the matcher,
  * sorter, etc. is run. It can be used to restructure data received
  * from a remote source such that it can be standardised to the format
  * typeahead expects.
  *
  * Most significantly: it can now handle headers. If the parser is
  * written such that it returns an object instead of an array:
  *
  *   items = { HEADER: [ value, value ],
  *             HEADER: [ value, value ] }
  *
  * The keys will be used as a header, and the value array as the values
  * to be autocompleted upon. See
  * /app/javascripts/view/checklist_form.js for an example of this
  * parser. Other methods have been modified to account for this, such
  * as lookup and render.
  *
  * Second most important: If the source is given as an object, rather
  * than an array, in the following format then the user's query will be
  * sent to the defined URL with a param name as listed and the results
  * returned used as the data source, and any other params being sent as
  * key/value pairs. This is better shown with an example:
  *
  *   source = { url: "http://ajax.js",
  *              params: { param_name: 'json_value_returned',
  *                        value: this.$input.val(),
  *                        random_param: 'insignificance' } }
  *
  * This will call:
  *   'http://ajax.js?json_value_returned=inputvalue&random_param=insignificance
  */

  var Typeahead = function (element, options) {
    this.$element = $(element)
    this.options = $.extend({}, $.fn.typeahead.defaults, options)
    this.matcher = this.options.matcher || this.matcher
    this.sorter = this.options.sorter || this.sorter
    this.highlighter = this.options.highlighter || this.highlighter
    this.updater = this.options.updater || this.updater

    // The parser is run on the dataset before lookup is called
    this.parser = this.options.parser || this.parser

    // Allow us to override functions that Mr. Fat doesn't want us to
    // override
    this.select = this.options.select || this.select
    this.render = this.options.render || this.render

    this.$location = $(this.options.location) || $(this.location)

    this.$menu = $(this.options.menu).appendTo(this.$location)
    this.source = this.options.source
    this.shown = false
    this.listen()
  }

  Typeahead.prototype = {

    constructor: Typeahead

  , select: function () {
      // Do nothing when a header is clicked on
      if (this.$menu.find('.active').hasClass('list-header')) { return; }

      var val = this.$menu.find('.active').attr('data-value')
      this.$element
        .val(this.updater(val))
        .change()
      return this.hide()
    }

  , updater: function (item) {
      return item
    }

  , parser: function(data) {
      return data
    }

  , show: function () {
      var pos = $.extend({}, this.$element.offset(), {
        height: this.$element[0].offsetHeight
      })

      this.$location.show()
      this.shown = true
      return this
    }

  , hide: function () {
      this.$location.hide()
      this.shown = false
      return this
    }

  , lookup: function (event) {
      var that = this
        , items
        , q;

      this.query = this.$element.val();

      if (!this.query) {
        return this.shown ? this.hide() : this;
      }

      // If the source is defined as a URL, perform an AJAX request for
      // the resource
      if (this.source.length === undefined) {
        var url = this.source.url;

        // Clean up the params and assign the value to the proper param
        // name as defined by the user
        var params = this.source.params;
        params[params.param_name] = params.value;

        $.ajaxCors(url, "GET", params, "json", this, function(data) { this.handleResponse(data, this); });
      } else {
        this.handleResponse(this.source, this);
      }
    }

  , handleResponse: function(data, context) {
      var src = context.parser(data);

      if (src.length === undefined) {
        if ($.isEmptyObject(src)) {
          return context.shown ? context.hide() : context;
        }

        context.render(src).show();
      } else {
        items = $.grep(src, function (item) {
          return context.matcher(item);
        });

        items = context.sorter(items);

        if (!items.length) {
          return context.shown ? context.hide() : context;
        }

        context.render(items.splice(0, context.options.items)).show();
      }

      $('.search .scroll-area').jScrollPane({verticalDragMinHeight:20});
    }

  , matcher: function (item) {
      return ~item.toLowerCase().indexOf(this.query.toLowerCase());
    }

  , sorter: function (items) {
      var beginswith = []
        , caseSensitive = []
        , caseInsensitive = []
        , item

      while (item = items.shift()) {
        if (!item.toLowerCase().indexOf(this.query.toLowerCase())) beginswith.push(item)
        else if (~item.indexOf(this.query)) caseSensitive.push(item)
        else caseInsensitive.push(item)
      }

      return beginswith.concat(caseSensitive, caseInsensitive)
    }

  , highlighter: function (item) {
      var query = this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&')
      return item.replace(new RegExp('(' + query + ')', 'ig'), function ($1, match) {
        return '<strong>' + match + '</strong>'
      })
    }

  , render: function (items) {
      var that = this

      // If items is an object, then we must be using headers
      if (items.length === undefined) {
        var result = [];
        for (var cat in items) {
          var i = $(that.options.item).text(cat.toString()).addClass('list-header');
          result.push(i[0]);

          items[cat].forEach(function(item, i) {
            var i = $(that.options.item).attr('data-value', item);
            i.find('a').html(that.highlighter(item))
            result.push(i[0]);
          });
        }

        $(result[1]).addClass('active')
        this.inject_menu(result)
      } else {
        items = $(items).map(function (i, item) {
          i = $(that.options.item).attr('data-value', item)
          i.find('a').html(that.highlighter(item))
          return i[0]
        })

        items.first().addClass('active')
        this.inject_menu(items)
      }

      return this
    }

    /*
     * Injects the given HTML in to the deepest child element in the
     * provided menu HTML
     */
  , inject_menu: function(html) {
      return this.$menu.find('ul').html(html);
    }

  , next: function (event) {
      var active = this.$menu.find('.active').removeClass('active')
        , next = active.next()

      if (!next.length) {
        next = $(this.$menu.find('li')[0])
      }

      // Don't allow headers to be selected
      if (next.hasClass('list-header')) {
        next = next.next();
      }

      next.addClass('active')
    }

  , prev: function (event) {
      var active = this.$menu.find('.active').removeClass('active')
        , prev = active.prev()

      if (!prev.length) {
        prev = this.$menu.find('li').last()
      }

      if (prev.hasClass('list-header')) {
        prev = prev.prev();
      }

      prev.addClass('active')
    }

  , listen: function () {
      this.$element
        .on('blur',     $.proxy(this.blur, this))
        .on('keypress', $.proxy(this.keypress, this))
        .on('keyup',    $.proxy(this.keyup, this))

      if ($.browser.webkit || $.browser.msie) {
        this.$element.on('keydown', $.proxy(this.keypress, this))
      }

      this.$menu
        .on('click', $.proxy(this.click, this))
        .on('mouseenter', 'li', $.proxy(this.mouseenter, this))
    }

  , keyup: function (e) {
      switch(e.keyCode) {
        case 40: // down arrow
        case 38: // up arrow
          break

        case 9: // tab
        case 13: // enter
          if (!this.shown) return
          this.select()
          break

        case 27: // escape
          if (!this.shown) return
          this.hide()
          break

        default:
          if (this.$element.val().length < 3) {
            this.hide();
            return;
          }

          // Check if the source is an object or array
          if (this.source.length === undefined) {
            this.source.params.value = this.$element.val();
          }

          this.lookup();
      }

      e.stopPropagation()
      e.preventDefault()
  }

  , keypress: function (e) {
      if (!this.shown) return

      switch(e.keyCode) {
        case 9: // tab
        case 13: // enter
        case 27: // escape
          e.preventDefault()
          break

        case 38: // up arrow
          if (e.type != 'keydown') break
          e.preventDefault()
          this.prev()
          break

        case 40: // down arrow
          if (e.type != 'keydown') break
          e.preventDefault()
          this.next()
          break
      }

      e.stopPropagation()
    }

  , blur: function (e) {
      var that = this
      setTimeout(function () { that.hide() }, 150)
    }

  , click: function (e) {
      e.stopPropagation()
      e.preventDefault()
      this.select()
    }

  , mouseenter: function (e) {
      this.$menu.find('.active').removeClass('active')
      $(e.currentTarget).addClass('active')
    }

  }


  /* TYPEAHEAD PLUGIN DEFINITION
   * =========================== */

  $.fn.typeahead = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('typeahead')
        , options = typeof option == 'object' && option
      if (!data) $this.data('typeahead', (data = new Typeahead(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.typeahead.defaults = {
    source: []
  , items: 4
  , menu: '<ul class="typeahead dropdown-menu"></ul>'
  , item: '<li><a href="#"></a></li>'
  , location: 'body'
  }

  $.fn.typeahead.Constructor = Typeahead


 /* TYPEAHEAD DATA-API
  * ================== */

  $(function () {
    $('body').on('focus.typeahead.data-api', '[data-provide="typeahead"]', function (e) {
      var $this = $(this)
      if ($this.data('typeahead')) return
      e.preventDefault()
      $this.typeahead($this.data())
    })
  })

}(window.jQuery);

!function ($) {

  $(function () {

    "use strict"; // jshint ;_;


    /* CSS TRANSITION SUPPORT (http://www.modernizr.com/)
     * ======================================================= */

    $.support.transition = (function () {

      var transitionEnd = (function () {

        var el = document.createElement('bootstrap')
          , transEndEventNames = {
               'WebkitTransition' : 'webkitTransitionEnd'
            ,  'MozTransition'    : 'transitionend'
            ,  'OTransition'      : 'oTransitionEnd otransitionend'
            ,  'transition'       : 'transitionend'
            }
          , name

        for (name in transEndEventNames){
          if (el.style[name] !== undefined) {
            return transEndEventNames[name]
          }
        }

      }())

      return transitionEnd && {
        end: transitionEnd
      }

    })()

  })

}(window.jQuery);
