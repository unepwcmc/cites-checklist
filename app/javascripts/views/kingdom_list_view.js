Checklist.KingdomListView = Ember.View.extend({
  templateName: 'kingdom_list_view',
  content: null,

  isVisible: false,

  tagName: 'div',

  classNames: ['c1'],

  id: "taxa",

  showAnimalia: function(){
    return this.content.get('animaliaPresent');
  }.property(),
  showPlantae: function(){
    return this.content.get('plantaePresent');
  }.property(),

  touchEnd: function(event) {
    if ($(event.target).is('a.clear-search')) {
      this.clearSearch();
    }
  },

  isFiltered: function() {
    var filtersController = Checklist.get('router').get('filtersController');
    var params            = filtersController.toParams();

    return (params.country_ids.length > 0) ||
           (params.cites_appendices.length > 0) ||
           (params.cites_region_ids.length > 0) ||
           (params.scientific_name.length > 0);
  }.property().volatile(),
  clearSearch: function() {
    var filtersController = Checklist.get('router').get('filtersController');

    filtersController.resetParams();

    // Keep the taxonomic view, common name languages, etc. in the URL
    var params = filtersController.toParams();
    Checklist.get('router').transitionTo('search', {params: $.param(params)});
  },

  currentPage: function() {
    return Checklist.get('router').get('filtersController').get('page');
  }.property(),
  totalPages: function() {
    var filtersController = Checklist.get('router').get('filtersController');
    var total_taxa = this.content.get('total_cnt');
    var per_page   = filtersController.get('per_page');

    return Math.ceil(total_taxa / per_page);
  }.property(),
  showPageControls: function() {
    return this.get('totalPages') > 1;
  }.property(),
  showNext: function(){
    var filtersController = Checklist.get('router').get('filtersController');

    var total_taxa   = this.content.get('total_cnt');
    var current_page = filtersController.get('page');
    var per_page     = filtersController.get('per_page');
    var total_pages  = Math.ceil(total_taxa / per_page);

    return (current_page) < total_pages;
  }.property(),
  showPrev: function(){
    return Checklist.get('router').get('filtersController').get('page') > 1;
  }.property(),

  nextPage: function(){
    var router = Checklist.get('router');
    var filtersController = router.get('filtersController');

    var currentPage = filtersController.get('page');
    if (this.get('showNext')){
      filtersController.set('page', currentPage + 1);

      var filters = filtersController.toParams();
      var params = $.param(filters);

      Checklist.get('router').transitionTo('search', {params: params, redraw: false});
    }
  },
  prevPage: function(){
    var router = Checklist.get('router');
    var filtersController = router.get('filtersController');

    var currentPage = filtersController.get('page');
    if (this.get('showPrev')){
      filtersController.set('page', currentPage - 1);

      var filters = filtersController.toParams();
      var params = $.param(filters);

      Checklist.get('router').transitionTo('search', {params: params, redraw: false});
    }
  },

  didInsertElement: function() {
    var that = this;
    $('#loading').fadeOut('fast', function() {
      that.$().fadeIn();
      that.set('isVisible',true);
    });

    $('#content-aside').show();

    $('a.new-taxa').hoverTooltip({
      positionTypeX: 'left',
      positionTypeY: 'top',
      attribute:'title',
      extraOffsetX: -2,
      extraOffsetY: 2,
      tooltipStructure:
      '<div class="new-tooltip"><div class="tooltip-text"></div>' +
      '<div class="tooltip-decor"></div></div>'
    });

    Ember.run.next(this, function(){
      var filtersController = Checklist.get('router').get('filtersController');

      if (filtersController.get('taxonomicLayout')) {
        // code to be executed in the next RunLoop, which will be scheduled after the current one
        this.createFloatingElements();
      }
    });

    this.onWindowResize();
    $(window)
     .scroll(this.updateFloatingElements)
     .resize(this.onWindowResize);

    // Redraw custom form elements (advanced options box)
    if (Checklist.CFE !== null) {
      Checklist.CFE.repaint();
    }
  },

  becameVisible: function() {
    // Ensure centre vertical alignment for appendix icon and countries
    // list in the taxa list
    $('.column-container').sameHeight({
      elements: '.column-area',
      flexible: false
    });
  },

  onWindowResize: function() {
    $('.floatingHeader').width($('.persist-header').first().width());
    $('.filterFloatingHeader').width($('.filter-control').first().width());

    if ($('.c1').width() <= 650) {
      $('header .aside').css({
        position: 'fixed'
      });

      $('.aside').css({
        left: '900px'
      });
    } else {
      $('header .aside').css({
        position: 'relative'
      });

      $('.aside').css({
        left: 'auto'
      });
    }
  },
  createFloatingElements: function() {
    var clonedHeaderRow;

    /*
     * Clone each defined header and hide it. This will be used
     * as the top-fixed floating header when scrolling.
     */
    $(".persist-area").each(function() {
      clonedHeaderRow = $(this);
      clonedHeaderRow
        .before(clonedHeaderRow.clone())
        .css("width", clonedHeaderRow.width())
        .addClass("floatingHeader")
        .removeClass('persist-area')
        .removeClass('persist-header');
    });

    /*
     * Calculates groups of species by determining
     * the list items between each header, and using this information
     * to wrap them in a <div> to allow grouping necessary for sticky
     * headers.
     */
    var current_group = [];
    $(".listing-item").each(function(index, item) {
      // For each iteration, if the current item is a header or the 
      // last item then we can assume the previous items in 
      // current_group are a headed group of species and can be 
      // wrapper in the grouping <div>
      if ($(item).hasClass('persist-area') || index == ($('.listing-item').length - 1)) {
        if (current_group.length > 0) {
          var to_wrap = $(current_group).map(function() {return this.toArray();} );
          to_wrap.wrapAll('<div class="persist-area">');
        }

        current_group = [];
        $(item).removeClass('persist-area');
      }

      current_group.push($(item));
    });
  },
  updateFloatingElements: function(event) {
    var filtersController = Checklist.get('router').get('filtersController');

    if (filtersController.get('taxonomicLayout')) {
      var top_offset = 214;
      if ($('.filter-control').length > 0) {
        top_offset = top_offset + 36;
      }

      /*
       * Hide and show the cloned headers as appropriate.
       *
       * When we scroll past a higher taxa heading, we make the cloned
       * floating header visible and stick it to the top of the listing
       * secion.
       */
      $(".persist-area").each(function(index, element) {
        var el         = $(this),
        offset         = el.offset(),
        scrollTop      = $(window).scrollTop(),
        floatingHeader = $($(".floatingHeader")[index]);

        floatingHeader.width(el.children('.persist-header').width());
        floatingHeader.css({
          top: top_offset + "px"
        });

        var nextEl = $($('.persist-area')[index+1]).children('.persist-header');

        if (nextEl.length > 0) {
          var floatingFromTop = (floatingHeader.offset().top + floatingHeader.outerHeight()) + scrollTop;
          var fixedFromTop    = nextEl.offset().top + scrollTop;

          var difference = floatingFromTop - fixedFromTop;

          if (difference >= 0) {
            floatingHeader.css({
              "top": (parseFloat(floatingHeader.css('top')) - difference) + "px"
            });
          } else {
            floatingHeader.css({
              "top": top_offset + "px"
            });
          }
        }

        if ((scrollTop + top_offset > offset.top) && (scrollTop < offset.top + el.height())) {
          floatingHeader.css({
            "visibility": "visible"
          });
        } else {
          floatingHeader.css({
            "visibility": "hidden"
          });
        }
      });
    }

    if (!$(event.target).is('div.scroll-area')) {
      $('.drop.show').removeClass('show');
    }

    if (!($('.filterFloatingHeader').length > 0)) {
      clonedFilterControl = $('.filter-control');
      clonedFilterControl
        .before(clonedFilterControl.clone())
        .css("width", clonedFilterControl.width())
        .addClass("filterFloatingHeader");
    }

    $('.filter-control').css({
      "visibility": ($(window).scrollTop() <= 0) ? "visible" : "hidden"
    });

    $('.filterFloatingHeader').css({
      "visibility": ($(window).scrollTop() > 0) ? "visible" : "hidden"
    });

    /* Prevent the paging controls from floating over the footer */

    // Calculate how much of the document remains, and use it
    // to determine how much of the footer is visible
    var remaining     = ($(document).height() - $(window).scrollTop())-$(window).height();
    var footer_height = $('#footer').outerHeight();

    var offset = (footer_height - remaining);
    offset     = (offset > footer_height) ? footer_height : offset;

    // Constant space beneath paging
    var bottom_offset = 20;

    $(".paging").css({
      "bottom": (offset > 0 ? offset + bottom_offset : bottom_offset) + "px"
    });
  }
});
