Checklist.TimelineEventListView = Ember.CollectionView.extend({
  content: null,
  itemViewClass: Ember.View.extend({
    tagName: 'a',
    classNames: ['ico', 'tooltip'],
    classNameBindings: ['colour'],
    colour: function(){
      return this.get('parentView.parentView.colour');
    }.property(),
    contextBinding: 'content',
    template: Ember.Handlebars.compile(
      "<div class=\"circle {{unbound view.colour}} event\">{{unbound view.eventSymbol}}</div>" +
      "<div id=\"popup{{unbound id}}\" style=\"display:none\">{{unbound notes}}</div>"
    ),
    positionInPixels: function(){
      var total = this.get('parentView.parentView.totalWidthInPixels');
      var leftOffset = this.get('parentView.parentView.leftOffsetInPixels');
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
      var res = this.get('content.effective_at');
      var party = this.get('parentView.parentView.content.party');
      return (party !== null ? party + ' · ' + res : res);
    }.property(),
    href: function(){
      //TODO
      return '#popup' + this.get('content.id');
    }.property()
  }),
  afterRender: function(){
    Ember.run.next(this, function(){
    // Initialise history tooltips
    this.$('a.tooltip').hoverTooltip({
      positionTypeX: 'left',
      positionTypeY: 'top',
      attribute:'title',
      extraOffsetX: -2,
      extraOffsetY: 2,
      tooltipStructure: '<div class="custom-tooltip"><div class="ico-tooltip"></div><div class="tooltip-text"></div><div class="tooltip-decor"></div></div>'
    });
    });
  }
});

