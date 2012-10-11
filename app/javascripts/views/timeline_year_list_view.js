Checklist.TimelineYearListView = Ember.CollectionView.extend({
  classNames: ['timescale-row'],

  itemViewClass: Ember.View.extend({
    tagName: 'div',
    classNames: ['year'],
    template: Ember.Handlebars.compile("{{unbound year}}"),

    contextBinding: 'content',

    positionInPixels: function(){
      var total = this.get('parentView.parentView.totalWidthInPixels');
      var leftOffset = this.get('parentView.parentView.leftOffsetInPixels');
      return (this.get('content.pos') * (total - leftOffset)) + leftOffset;
    }.property().volatile(),

    attributeBindings: ['style'],
    style: function() {
      return 'left:' + this.get('positionInPixels') + 'px';
    }.property('parentView.parentView.totalWidthInPixels'),
  })
});

