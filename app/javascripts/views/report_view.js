Checklist.ReportView = Em.View.extend({
  isVisible: true,
  templateName: 'report_view',

  generatingClick: function() {
    //debugger;
    this.get('downloadController').refresh();
    this.get('downloadController').startPolling();

    //$(this.$().find('#generating-downloads .scroll-area')).jScrollPane({verticalDragMinHeight:20, autoReinitialise: true});
  },

  contentDidChange: function() {
    var count = this.get('downloadController.content.length');

    // TODO
    // If number of generating reports is 0, close colorbox, somehow
    // open finished box

    if (count === 0) {
      this.$().fadeOut();
    } else {
      this.$().fadeIn();
    }

    this.$().find('a').each(function(index, item) {
      $(item).colorbox(Checklist.CONFIG.colorbox);
    });
  }.observes('downloadController.content', 'downloadController.content.isLoaded'),
});
