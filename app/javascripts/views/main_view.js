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
        onClosed: function(event) {
          $.cookie("Checklist.CONFIG.visited", true);
        }
      };

      $('#landing-btn').colorbox(landing_colorbox_config);
    }
  }
});
