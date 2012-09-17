Checklist.TimelineEventListView = Ember.CollectionView.extend({
  content: null,
  itemViewClass: Ember.View.extend({
    tagName: 'a',
    classNames: ['ico', 'tooltip'],
    classNameBindings: ['colour'],
    colour: function(){
      return this.get('parentView').get('parentView').get('colour');
    }.property(),
    contextBinding: 'content',
    template: Ember.Handlebars.compile("<div class=\"circle {{unbound view.colour}} event\">{{unbound view.eventSymbol}}</div>"),
    positionInPixels: function(){
      var total = this.get('parentView').get('parentView').get('totalWidthInPixels');
      var leftOffset = this.get('parentView').get('parentView').get('leftOffsetInPixels');
      return (this.get('content.pos') * (total - leftOffset)) + leftOffset;
    }.property(),
    eventSymbol: function(){
      if (this.get('content.change_type_name') == 'ADDITION'){
        return '+';
      } else if (this.get('content.change_type_name') == 'DELETION'){
        return '-';
      } if (this.get('content.change_type_name') == 'RESERVATION'){
        return 'R';
      } if (this.get('content.change_type_name') == 'RESERVATION_WITHDRAWAL'){
        return 'W';
      }
    }.property(),
    attributeBindings: ['style', 'title', 'href'],
    style: function() {
      return 'left:' + this.get('positionInPixels') + 'px';
    }.property(),
    title: function(){
      //TODO
      return 'GB · FEB 09';
    }.property(),
    href: function(){
      //TODO
      return '#popup1';
    }.property()
  })
});
