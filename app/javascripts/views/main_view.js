Checklist.MainView = Ember.View.extend({
  tagName: 'section',
  templateName: 'main_view',

  classNames: ['main'],

  didInsertElement: function() {
    var opts = {
      lines: 13, // The number of lines to draw
      length: 2, // The length of each line
      width: 4, // The line thickness
      radius: 10, // The radius of the inner circle
      corners: 1, // Corner roundness (0..1)
      rotate: 0, // The rotation offset
      color: '#000', // #rgb or #rrggbb
      speed: 1, // Rounds per second
      trail: 60, // Afterglow percentage
      shadow: false, // Whether to render a shadow
      hwaccel: false, // Whether to use hardware acceleration
      className: 'spinner', // The CSS class to assign to the spinner
      zIndex: 900, // The z-index (defaults to 2000000000)
      top: 'auto', // Top position relative to parent in px
      left: 'auto' // Left position relative to parent in px
    };
    var target = document.getElementById('loading');
    var spinner = new Spinner(opts).spin(target);

    if (!$.cookie("Checklist.CONFIG.visited")) {
      var landing_colorbox_config = {
        inline: true,
        transition: 'none',
        close: 'x',
        maxWidth: 675,
        innerWidth: 675,
        opacity: 0.8,
        fixed: true,
        open: true,
        onOpen: function(event) {
          // A truly awful hack to ensure that the close button is
          // aligned properly. Without modifying colorbox, there's no
          // way to make the CSS for the close button for this box
          // distinct from the css for the close button for other boxes
          // of different widths.
          $('#cboxClose').css({right: '30px'});
        },
        onClosed: function(event) {
          $.cookie("Checklist.CONFIG.visited", true);
          $('#cboxClose').css({right: '10px'});
        }
      };

      $('#landing-btn').colorbox(landing_colorbox_config);
    }
  },

  closeLandingBox: function(event) {
    $.colorbox.close();
  }
});
