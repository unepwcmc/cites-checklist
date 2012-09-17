Checklist.TimelineIntervalListView = Ember.CollectionView.extend({
  content: null,
  itemViewClass: Ember.View.extend({
    tagName: 'div',
    classNames: ['line'],
    contextBinding: 'content',
    template: null,
    positionInPixels: function(){
      //TODO
      var total = 700;
      return (this.get('content.start_pos') * total);
    }.property(),
    widthInPercent: function(){
      //TODO
      var total = 700;
      return (this.get('content.end_pos') - this.get('content.start_pos')) * 100;
    }.property(),
    attributeBindings: ['style'],
    style: function() {
        return 'width:' + this.get('widthInPercent') + '%;left:' + this.get('positionInPixels') + 'px';
    }.property()
  })
});

