Checklist.TimelineView = Ember.View.extend({
  templateName: 'timeline_view',
  content: null,
  timelineYears: null,
  contextBinding: 'content',
  totalWidthInPixels: function(){
    return this.get('parentView.totalWidthInPixels');
  }.property(),
  leftOffsetInPixels: function(){
    return this.get('parentView.leftOffsetInPixels');
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
  hasNestedTimelines: function(){
    return this.get('content.timelines.length') > 0;
  }.property()
});