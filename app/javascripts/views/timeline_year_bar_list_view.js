Checklist.TimelineYearBarListView = Ember.CollectionView.extend({
  itemViewClass: Ember.View.extend({
    tagName: 'div',
    classNames: ['year-bar'],
    template: Ember.Handlebars.compile("&nbsp;"),

    contextBinding: 'content',

    positionInPixels: function(){
      var total = this.get('parentView.parentView.parentView.totalWidthInPixels');
      var leftOffset = this.get('parentView.parentView.leftOffsetInPixels');
      return (this.get('content.pos') * (total - leftOffset)) + leftOffset;
    }.property().volatile(),

    attributeBindings: ['style'],
    style: function() {
      return 'left:' + this.get('positionInPixels') + 'px';
    }.property('parentView.parentView.parentView.totalWidthInPixels'),
  })
});

