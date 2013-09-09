Checklist.TimelineIntervalListView = Ember.CollectionView.extend({
  itemViewClass: Ember.View.extend({
    tagName: 'div',
    classNames: ['line'],
    classNameBindings: ['colour'],

    contextBinding: 'content',

    colour: function(){
      return this.get('parentView.parentView.colour');
    }.property(),

    positionInPixels: function(){
      var total = this.get('parentView.parentView.parentView.parentView.totalWidthInPixels');
      var leftOffset = this.get('parentView.parentView.parentView.leftOffsetInPixels');
      return (this.get('content.start_pos') * (total - leftOffset) + leftOffset);
    }.property().volatile(),
    widthInPercent: function(){
      var total = this.get('parentView.parentView.parentView.parentView.totalWidthInPixels');
      var leftOffset = this.get('parentView.parentView.parentView.leftOffsetInPixels');
      var rightOffset = this.get('parentView.parentView.parentView.rightOffsetInPixels');
      return (
        (
          ((this.get('content.end_pos') - this.get('content.start_pos')) * (total - leftOffset)) - rightOffset
        ) / total
      ) * 100;
    }.property().volatile(),

    attributeBindings: ['style'],
    style: function() {
      return 'width:' + this.get('widthInPercent') + '%;left:' + this.get('positionInPixels') + 'px';
    }.property('parentView.parentView.parentView.parentView.totalWidthInPixels')
  })
});
