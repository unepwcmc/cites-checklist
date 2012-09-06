/*
 * jQuery Tooltip plugin
 * 
 * Modified to not follow the cursor within the object that triggers the tooltip.
 */
;(function($){
  $.fn.hoverTooltip = function(o) {
    var options = $.extend({
      tooltipStructure: '<div class="hover-tooltip"><div class="tooltip-text"></div></div>',
      tooltipSelector: '.tooltip-text',
      positionTypeX: 'center',
      positionTypeY: 'top',
      attribute:'title',
      extraOffsetX: 10,
      extraOffsetY: 30,
      showOnTouchDevice: true
    },o);
    
    // create tooltip
    var tooltip = $('<div>').html(options.tooltipStructure).children().css({position:'absolute'});
    var tooltipTextBox = tooltip.find(options.tooltipSelector);
    var tooltipWidth, tooltipHeight;
    
    
    // tooltip logic
    function initTooltip(item) {
      var tooltipText = item.attr(options.attribute);
      item.removeAttr(options.attribute);
      if(isTouchDevice) {
        item.bind('touchstart', function(e) {
          showTooltip(item, tooltipText, getEvent(e));
          jQuery(document).one('touchend', hideTooltip);
        });
      } else {
        item.bind('mouseenter', function(e) {
          showTooltip(item, tooltipText, e);
        }).bind('mouseleave', hideTooltip);
      }
    }
    function showTooltip(item, text, e) {
      tooltipTextBox.html(text);
      tooltip.appendTo(document.body).show();
      tooltipWidth = tooltip.outerWidth(true);
      tooltipHeight = tooltip.outerHeight(true);
      moveTooltip(e, item);
    }
    function hideTooltip() {
      tooltip.remove();
    }
    function moveTooltip(e) {
      var location = $(e.target).offset();
        
      var top, left, x = location.left, y = location.top;

      switch(options.positionTypeY) {
        case 'top':
          top = y - tooltipHeight - options.extraOffsetY;
          break;
        case 'center':
          top = y - tooltipHeight / 2;
          break;
        case 'bottom':
          top = y + options.extraOffsetY;
          break;
      }

      switch(options.positionTypeX) {
        case 'left':
          left = x - tooltipWidth - options.extraOffsetX;
          break;
        case 'center':
          left = x - tooltipWidth / 2;
          break;
        case 'right':
          left = x + options.extraOffsetX;
          break;
      }
      
      tooltip.css({
        top: top,
        left: left 
      });
    }
    
    // add handlers
    return this.each(function(){
      initTooltip($(this));
    });
  }
  
  // parse event
  function getEvent(e) {
    return e.originalEvent.changedTouches ? e.originalEvent.changedTouches[0] : e;
  }
  
  // detect device type
  var isTouchDevice = (function() {
    try {
      return ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch;
    } catch (e) {
      return false;
    }
  }());
}(jQuery));