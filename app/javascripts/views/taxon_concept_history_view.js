Checklist.TaxonConceptHistoryView = Em.View.extend({
  tagName: 'div',
  classNames: ['area'],
  templateName: "taxon_concept_history_view",

  id: null,

  contextBinding: 'content',

  totalWidthInPixels: 700,
  leftOffsetInPixels: 50,
  rightOffsetInPixels: 8,

  countryCount: 0,
  noTimelinesAvailable: false,

  didInsertElement: function() {
    var that = this;

    if (this.get('content.timeline_event_count') == 0) {
      this.$().addClass('no-listing-changes');
      this.set('noTimelinesAvailable', true);
    }

    if (this.get('content.timelines').get('length')) {
      var party_count = 0;

      this.get('content.timelines').mapProperty('parties').forEach(function(item) {
        party_count += item.length;
      });

      this.set('countryCount', party_count);
    }

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

  touchEnd: function(event) {
    console.log(event.target);
    debugger;
    if ($(event.target).is('div.area-b')) {
      this.expandCountryTimeline(event);
    }
  },

  expandCountryTimeline: function(event) {
    $(event.target).closest('a').siblings('.country-timelines').stop().slideToggle();
  },
});
