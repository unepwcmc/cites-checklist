/*
 * jQuery Open/Close plugin
 */
;(function($){
  $.fn.openClose = function(o){
    // default options
    var options = $.extend({
      addClassBeforeAnimation: true,
      activeClass:'active',
      opener:'.opener',
      slider:'.slide',
      animSpeed: 400,
      animStart:false,
      animEnd:false,
      effect:'fade',
      event:'click'
    },o);

    return this.each(function(){
      // options
      var holder = $(this), animating;
      var opener = $(options.opener, holder);
      var slider = $(options.slider, holder);
      if(slider.length) {
        // Add a click handler to all DOM elements other than the drop
        // down so that users can "click off" to close to drop down.
        $('body').bind(options.event, function(e) {
          if ($(e.target).closest(slider).length > 0) return;

          if(holder.hasClass(options.activeClass)) {
            animating = true;
            toggleEffects[options.effect].hide({
              speed: options.animSpeed,
              box: slider,
              complete: function() {
                animating = false;
                if(!options.addClassBeforeAnimation) {
                  holder.removeClass(options.activeClass);
                }
                if(typeof options.animEnd === 'function') options.animEnd();
              }
            });
            if(options.addClassBeforeAnimation) {
              holder.removeClass(options.activeClass);
            }
          }
        });

        opener.bind(options.event,function(){
          if(!animating) {
            animating = true;
            if(typeof options.animStart === 'function') options.animStart();
            if(holder.hasClass(options.activeClass)) {
              toggleEffects[options.effect].hide({
                speed: options.animSpeed,
                box: slider,
                complete: function() {
                  animating = false;
                  if(!options.addClassBeforeAnimation) {
                    holder.removeClass(options.activeClass);
                  }
                  if(typeof options.animEnd === 'function') options.animEnd();
                }
              });
              if(options.addClassBeforeAnimation) {
                holder.removeClass(options.activeClass);
              }
            } else {
              if(options.addClassBeforeAnimation) {
                holder.addClass(options.activeClass);
              }
              toggleEffects[options.effect].show({
                speed: options.animSpeed,
                box: slider,
                complete: function() {
                  animating = false;
                  if(!options.addClassBeforeAnimation) {
                    holder.addClass(options.activeClass);
                  }
                  if(typeof options.animEnd === 'function') options.animEnd();
                }
              })
            }
          }
          return false;
        });
        if(holder.hasClass(options.activeClass)) {
          console.log('hasClass');
          slider.show();
        }
        else {
          slider.hide();
        }
      }
    });
  }
  
  // animation effects
  var toggleEffects = {
    slide: {
      show: function(o) {
        o.box.slideDown(o.speed, o.complete);
      },
      hide: function(o) {
        o.box.slideUp(o.speed, o.complete);
      }
    },
    fade: {
      show: function(o) {
        o.box.fadeIn(o.speed, o.complete);
      },
      hide: function(o) {
        o.box.fadeOut(o.speed, o.complete);
      }
    },
    none: {
      show: function(o) {
        o.box.show(0, o.complete);
      },
      hide: function(o) {
        o.box.hide(0, o.complete);
      }
    }
  }
}(jQuery));
