Checklist.TimelineIntervalListView = Ember.CollectionView.extend({
  content: null,
  itemViewClass: Ember.View.extend({
    tagName: 'div',
    classNames: ['line'],
    classNameBindings: ['colour'],
    colour: function(){
      return this.get('parentView').get('parentView').get('colour');
    }.property(),
    contextBinding: 'content',
    template: null,
    positionInPixels: function(){
      var total = this.get('parentView').get('parentView').get('totalWidthInPixels');
      var leftOffset = this.get('parentView').get('parentView').get('leftOffsetInPixels');
      return (this.get('content.start_pos') * (total - leftOffset) + leftOffset);
    }.property(),
    widthInPercent: function(){
      var total = this.get('parentView').get('parentView').get('totalWidthInPixels');
      var leftOffset = this.get('parentView').get('parentView').get('leftOffsetInPixels');
      return (
        (
          (this.get('content.end_pos') - this.get('content.start_pos')) * (total - leftOffset)
        ) / total
      ) * 100;
    }.property(),
    attributeBindings: ['style'],
    style: function() {
        return 'width:' + this.get('widthInPercent') + '%;left:' + this.get('positionInPixels') + 'px';
    }.property()
  })
});

