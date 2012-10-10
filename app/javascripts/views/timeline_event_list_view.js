Checklist.TimelineEventListView = Ember.CollectionView.extend({
  content: null,
  itemViewClass: Ember.View.extend({
    tagName: 'a',
    classNames: ['ico'],
    classNameBindings: ['colour', 'tooltip'],
    colour: function(){
      return this.get('parentView.parentView.colour');
    }.property(),
    appendix: function(){
      return this.get('parentView.parentView.content.appendix');
    }.property(),
    hasParty: function(){
      return (this.get('content.party') !== null);
    }.property(),
    hasNotes: function(){
      return (this.get('content.specific_notes') !== null) ||
        (this.get('content.generic_notes') !== null);
    }.property(),
    tooltip: function(){
      var res = 'tooltip-';
      var symbol = this.get('eventSymbol');
      return res + Checklist.Helpers.symbolAsText(symbol);
    }.property(),
    contextBinding: 'content',
    templateName: 'timeline_event_view',
    positionInPixels: function(){
      var total = this.get('parentView.parentView.totalWidthInPixels');
      var leftOffset = this.get('parentView.parentView.leftOffsetInPixels');
      var iconOffset = 10;//so that icon is centered
      return (this.get('content.pos') * (total - leftOffset)) + leftOffset - iconOffset;
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
    eventClass: function() {
      // Return an extra class for non-+/- symbols as these need
      // different font sizes, etc.
      switch (this.get('eventSymbol')) {
        case '+':
        case '-':
          return;
        default:
          return 'text';
      }
    }.property(),
    eventDescription: function(){
      if (this.get('content.change_type_name') == 'ADDITION'){
        return 'ADDITION TO APPENDIX ' + this.get('appendix');
      } else if (this.get('content.change_type_name') == 'DELETION'){
        return 'DELETION FROM APPENDIX ' + this.get('appendix');
      } else if (this.get('content.change_type_name') == 'RESERVATION'){
        return 'RESERVATION';
      } else if (this.get('content.change_type_name') == 'RESERVATION_WITHDRAWAL'){
        return 'RESERVATION WITHDRAWAL';
      }
    }.property(),
    attributeBindings: ['style', 'title', 'href'],
    style: function() {
      return 'left:' + this.get('positionInPixels') + 'px';
    }.property(),
    title: function(){
      var res = this.get('content.effective_at');
      var party = this.get('content.party.iso_code2');
      return (party !== null ? party + ' · ' + res : res);
    }.property(),
    href: function(){
      return '#popup' + this.get('content.id');
    }.property(),
    didInsertElement: function(){
      this.$().hoverTooltip({
        positionTypeX: 'left',
        positionTypeY: 'top',
        attribute:'title',
        extraOffsetX: 16,
        extraOffsetY: 2,
        tooltipStructure:
        '<div class="custom-tooltip"><div class="ico-tooltip ' + this.get('eventClass') + '">' +
        this.get('eventSymbol') +'</div><div class="tooltip-text"></div>' +
        '<div class="tooltip-decor"></div></div>'
      });

      this.$().colorbox(Checklist.Helpers.colorboxSettings);
    }
  })
});

