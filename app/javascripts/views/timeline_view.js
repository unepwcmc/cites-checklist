Checklist.TimelineView = Ember.View.extend({
  templateName: 'timeline_view',
  content: null,
  contextBinding: 'content',
  colour: function(){
    if (this.get('content').get('appendix') == 'I' ){
      return 'blue';
    } else if (this.get('content').get('appendix') == 'II' ){
      return 'green';
    } else {
      return 'orange';
    }
  }.property(),
  hasNestedTimelines: function(){
    return (this.get('content.timelines') !== null);
  }.property(),
  isPartyTimeline: function(){
    return (this.get('content.party') !== null);
  }.property()
});