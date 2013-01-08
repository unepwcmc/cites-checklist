Checklist.ReportView = Em.View.extend({
  isVisible: true,
  templateName: 'report_view',

  generatingClick: function() {
    this.get('downloadController').refresh();
    this.get('downloadController').startPolling();
  },

  contentDidChange: function() {
    var count = this.get('downloadController.content.length');

    if (count === 0) {
      this.$().fadeOut();
    } else {
      this.$().fadeIn();
    }

    $.colorbox.resize();

    var config = $.extend({
        onComplete: function() {
          setTimeout(function() {
            var list = $('.downloads-list:visible');

            if (list.find('li').length > 2) {
              list.jScrollPane({
                verticalDragMinHeight: 20
              })
            }
          }, 500);
        }
      },
      Checklist.CONFIG.colorbox
    );

    $("#generating-downloads-btn").colorbox(Checklist.CONFIG.colorbox);
    $("#complete-download-btn").colorbox(Checklist.CONFIG.colorbox);
    $("#failed-download-btn").colorbox(Checklist.CONFIG.colorbox);

    this.$().find('a').each(function(index, item) {
      $(item).colorbox(Checklist.CONFIG.colorbox);
    });
  }.observes('downloadController.content', 'downloadController.content.isLoaded'),
});
