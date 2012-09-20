Checklist.TimelineYearBarListView = Ember.CollectionView.extend({
  content: null,
  itemViewClass: Ember.View.extend({
    tagName: 'div',
    contextBinding: 'content',
    classNames: ['year-bar'],
    template: Ember.Handlebars.compile("&nbsp;"),
    positionInPixels: function(){
      var total = this.get('parentView.parentView.totalWidthInPixels');
      var leftOffset = this.get('parentView.parentView.leftOffsetInPixels');
      return (this.get('content.pos') * (total - leftOffset)) + leftOffset;
    }.property(),
    attributeBindings: ['style'],
    style: function() {
      return 'left:' + this.get('positionInPixels') + 'px';
    }.property(),
  })
});

