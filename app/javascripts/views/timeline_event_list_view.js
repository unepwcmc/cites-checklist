Checklist.TimelineEventListView = Ember.CollectionView.extend({
  content: null,
  itemViewClass: Ember.View.extend({
    tagName: 'a',
    classNames: ['ico', 'tooltip'],
    contextBinding: 'content',
    template: Ember.Handlebars.compile("<div class=\"circle orange event\">{{unbound view.eventSymbol}}</div>"),
    positionInPixels: function(){
      //TODO
      var total = 700;
      return (this.get('content.pos') * total);
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

