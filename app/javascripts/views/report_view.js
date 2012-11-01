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

    if (count === 0) {
      this.$().fadeOut();
    } else {
      this.$().fadeIn();
    }
  }.observes('downloadController.content', 'downloadController.content.isLoaded'),

  didInsertElement: function() {
  }
});
