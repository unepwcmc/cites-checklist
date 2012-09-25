Checklist.KingdomListView = Ember.View.extend({
  templateName: 'kingdom_list_view',
  content: null,
  taxonConceptsController: null,
  filtersController: null,

  isVisible: false,

  showAnimalia: function(){
    return this.content.get('animaliaPresent');
  }.property(),
  showPlantae: function(){
    return this.content.get('plantaePresent');
  }.property(),

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

    Checklist.get('router').transitionTo('home');
  },

  currentPage: function() {
    return Checklist.get('router').get('filtersController').get('page') + 1;
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

    return (current_page + 1) < total_pages;
  }.property(),
  showPrev: function(){
    return Checklist.get('router').get('filtersController').get('page') > 0;
  }.property(),

  nextPage: function(){
    var filtersController = Checklist.get('router').get('filtersController');

    var currentPage = filtersController.get('page');
    if (this.get('showNext')){
      filtersController.set('page', currentPage + 1);

      var filters = filtersController.toParams();
      var params = $.param(filters);

      Checklist.get('router').transitionTo('search',{params: params});
    }
  },
  prevPage: function(){
    var filtersController = Checklist.get('router').get('filtersController');

    var currentPage = filtersController.get('page');
    if (this.get('showPrev')){
      filtersController.set('page', currentPage - 1);

      var filters = filtersController.toParams();
      var params = $.param(filters);

      Checklist.get('router').transitionTo('search',{params: params});
    }
  },

  didInsertElement: function() {
    var that = this;
    $('#loading').fadeOut('fast', function() {
      that.set('isVisible', true);
    });

    this.$('a.more-countries-tooltip').hoverTooltip({
      positionTypeX: 'center',
      positionTypeY: 'bottom',
      attribute:'title',
      extraOffsetX: 15,
      extraOffsetY: 40,
      tooltipStructure: '<div class="country-tooltip"><div class="tooltip-text"></div></div>'
    });

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

    // Vertical height management for listing rows
    $('.column-container').sameHeight({
      elements: '.column-area',
      flexible: true
    });

    Ember.run.next(this, function(){
      // code to be executed in the next RunLoop, which will be scheduled after the current one
      this.createFloatingElements();
    });

    $(window)
     .scroll(this.updateFloatingElements)
     .trigger("scroll")
     .resize(this.onWindowResize);
  },

  onWindowResize: function() {
    $('.floatingHeader').width($('.persist-header').first().width());
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
     * A glorious hack. Calculates groups of species by determining
     * the list items between each header, and using this information
     * to wrap them in a <div> to allow grouping necessary for sticky
     * headers.
     *
     * This will be fixed soon, but for now given items are limited to
     * 20 per page, the performance hit is minimal.
     */
    var current_group = [];
    $(".listing-item").each(function(index, item) {
      // For each iteration, if the current item is a header or the 
      // last item then we can assume the previous items in 
      // current_group are a headed group of species and can be 
      // wrapper in the grouping <div>
      if ($(item).hasClass('persist-area') || index == ($('.listing-item').length - 1)) {
        if (current_group.length > 0) {
          var to_wrap = $(current_group).map (function () {return this.toArray();} );
          to_wrap.wrapAll('<div class="persist-area">');
        }

        current_group = [];
        $(item).removeClass('persist-area');
      }

      current_group.push($(item));
    });
  },
  updateFloatingElements: function() {
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

      if ((scrollTop + 214 > offset.top) && (scrollTop < offset.top + el.height())) {
        floatingHeader.css({
          "visibility": "visible"
        });
      } else {
        floatingHeader.css({
          "visibility": "hidden"
        });
      }
    });

    /* Prevent the paging controls from floating over the footer */

    // Calculate how much of the document remains, and use it
    // to determine how much of the footer is visible
    var remaining = ($(document).height() - $(window).scrollTop())-$(window).height();
    var offset    = ($("#footer").outerHeight() - remaining);
    //
    // Constant space beneath paging
    var bottom_offset = 20;

    $(".paging").css({
      "bottom": (offset > 0 ? offset + bottom_offset : bottom_offset) + "px"
    });
  }
});
