Checklist.TimelineView = Ember.View.extend({
  templateName: 'timeline_view',

  contextBinding: 'content',

  totalWidthInPixels: function(){
    return this.get('parentView.totalWidthInPixels');
  }.property(),
  leftOffsetInPixels: function(){
    return this.get('parentView.leftOffsetInPixels');
  }.property(),
  rightOffsetInPixels: function(){
    return this.get('parentView.rightOffsetInPixels');
  }.property(),

  colour: function(){
    if (this.get('content').get('appendix') == 'I' ){
      return 'blue';
    } else if (this.get('content').get('appendix') == 'II' ){
      return 'green';
    } else {
      return 'orange';
    }
  }.property(),

  isPartyTimeline: function(){
    return (this.get('content.party') !== null);
  }.property(),
  continuesInPresent: function(){
    return this.get('content.timeline_intervals.lastObject.end_pos') == 1;
  }.property(),

  didInsertElement: function() {
    this.$('.party-tooltip').hoverTooltip({
      positionTypeX: 'center',
      positionTypeY: 'top',
      attribute:'title',
      extraOffsetX: 20,
      extraOffsetY: 2,
      tooltipStructure: '<div class="custom-tooltip"><div class="tooltip-text"></div><div class="tooltip-decor"></div></div>'
    });
  }
});
