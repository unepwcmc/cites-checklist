Checklist.TimelineYearListView = Ember.CollectionView.extend({
  content: null,
  itemViewClass: Ember.View.extend({
    tagName: 'span',
    contextBinding: 'content',
    template: Ember.Handlebars.compile("{{unbound year}}"),
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
