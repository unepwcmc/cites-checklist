Checklist.TaxonConceptHistoryView = Em.View.extend({
  tagName: 'div',
  classNames: ['area'],
  templateName: "taxon_concept_history_view",

  id: null,

  contextBinding: 'content',

  totalWidthInPixels: 700,
  leftOffsetInPixels: 50,
  rightOffsetInPixels: 8,

  didInsertElement: function() {
    var that = this;

    // Namespace the resize events so that they can be removed when the
    // view is destroyed
    this.set('id', Checklist.Helpers.generateId());
    $(window).bind('resize.'+this.get('id'), function() {
      if (that.isDestroyed) {
        $(window).unbind('resize.'+that.get('id'));
        return;
      }

      that.setWidth();
    });

    Ember.run.next(this, function(){
      this.setWidth();
    });
  },
  setWidth: function(width) {
    this.set('totalWidthInPixels', width || $('.column').width());
  },

  expandCountryTimeline: function(event) {
    $(event.target).closest('a').siblings('.country-timelines').stop().slideToggle();
  }
});
