jQuery(document).ready(function($) {
  var cf = new CustomFormElements({
      cssClass: 'styled',
  });
});

$(window).load(function(){
  $('.btn-holder .scroll-area').jScrollPane(
    {
      verticalDragMinHeight: 20,
    }
  );

  $('.search .scroll-area').jScrollPane(
    {
      verticalDragMinHeight: 20,
    }
  );

  var updateFloatingElements = function() {
     $(".persist-area").each(function(index, element) {
         var el             = $(this),
             offset         = el.offset(),
             scrollTop      = $(window).scrollTop(),
             floatingHeader = $($(".floatingHeader")[index])

         if ((scrollTop + 232 > offset.top) && (scrollTop < offset.top + el.height())) {
             floatingHeader.css({
              "visibility": "visible"
             });
         } else {
             floatingHeader.css({
              "visibility": "hidden"
             });      
         };
     });

    /* Prevent the paging controls from floating over the footer */

    // Calculate how much of the document remains, and use it
    // to determine how much of the footer is visible
    var remaining = ($(document).height() - $(window).scrollTop())-$(window).height();
    var offset    = ($("#footer").outerHeight() - remaining) + 20;

    if (offset > 0) {
      $(".paging").css({
        "bottom": offset + "px"
      })
    }
  }

  var initOpenClose = function() {
    jQuery('div.custom-holder').openClose({
      activeClass:'expanded',
      opener:'a.btn-custom',
      slider:'div.drop',
      effect:'none',
      animSpeed:500
    });

    jQuery('div.saved-holder').openClose({
      activeClass:'expanded',
      opener:'a.btn-saved',
      slider:'div.drop',
      effect:'none',
      animSpeed:500
    });
  }

  var initTooltips = function() {
    jQuery('a.tooltip').hoverTooltip({
      positionTypeX: 'left',
      positionTypeY: 'top',
      attribute:'title',
      extraOffsetX: -2,
      extraOffsetY: 2,
      tooltipStructure: '<div class="custom-tooltip"><div class="ico-tooltip"></div><div class="tooltip-text"></div><div class="tooltip-decor"></div></div>'
    });
  }

  var initSameHeight = function(){
    // basic examples
    jQuery('.column-container').sameHeight({
      elements: '.column-area',
      flexible: true
    });
  }

  var initLightbox = function() {
    $("#download").fancybox({
      fitToView : true,
      autoSize  : true,
      closeClick  : false,
    });
  }

  var initAffix = function() {
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
        .addClass("floatingHeader").removeClass('persist-area');
         
    });

    /*
     * A glorious hack. Calculates groups of species by determining
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
          var to_wrap = $(current_group).map (function () {return this.toArray();} );
          to_wrap.wrapAll('<div class="persist-area">');
        }

        current_group = [];
        $(item).removeClass('persist-area');
      }

      current_group.push($(item));
    });

    $(window)
     .scroll(updateFloatingElements)
     .trigger("scroll");
  }

  initLightbox();
  initOpenClose();
  initTooltips();
  initSameHeight();
  initAffix();
});

/*
 * jQuery FontResize Plugin
 * 
 * Used to handle browser font resizes when using iframes.
 */
jQuery.onFontResize = (function($) {
  $(function() {
    var randomID = 'font-resize-frame-' + Math.floor(Math.random() * 1000);
    var resizeFrame = $('<iframe>').attr('id', randomID).addClass('font-resize-helper');
    
    // required styles
    resizeFrame.css({
      width: '100em',
      height: '10px',
      position: 'absolute',
      borderWidth: 0,
      top: '-9999px',
      left: '-9999px'
    }).appendTo('body');
    
    // use native IE resize event if possible
    if ($.browser.msie && $.browser.version < 9) {
      resizeFrame.bind('resize', function () {
        $.onFontResize.trigger(resizeFrame[0].offsetWidth / 100);
      });
    }
    // use script inside the iframe to detect resize for other browsers
    else {
      var doc = resizeFrame[0].contentWindow.document;
      doc.open();
      doc.write('<scri' + 'pt>window.onload = function(){var em = parent.jQuery("#' + randomID + '")[0];window.onresize = function(){if(parent.jQuery.onFontResize){parent.jQuery.onFontResize.trigger(em.offsetWidth / 100);}}};</scri' + 'pt>');
      doc.close();
    }
    jQuery.onFontResize.initialSize = resizeFrame[0].offsetWidth / 100;
  });
  return {
    // public method, so it can be called from within the iframe
    trigger: function (em) {
      $(window).trigger("fontresize", [em]);
    }
  };
}(jQuery));
