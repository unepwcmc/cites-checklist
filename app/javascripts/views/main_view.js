Checklist.MainView = Ember.View.extend({
  tagName: 'section',
  templateName: 'main_view',

  classNames: ['main'],

  didInsertElement: function() {
    var target = document.getElementById('loading');
    var spinner = new Spinner(Checklist.CONFIG.spinner).spin(target);

    if (!$.cookie("Checklist.CONFIG.visited")) {
      var landing_colorbox_config = {
          inline: true,
          transition: 'fade',
          close: 'x',
          opacity: 0.8,
          fixed: true,
          maxWidth: 675,
          innerWidth: 675,
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
