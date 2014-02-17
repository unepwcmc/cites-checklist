Checklist.TimelineEventListView = Ember.CollectionView.extend({
  itemViewClass: Ember.View.extend({
    tagName: 'a',
    classNames: ['ico'],
    classNameBindings: ['colour', 'tooltip'],
    templateName: 'timeline_event_view',

    contextBinding: 'content',

    colour: function(){
      return this.get('parentView.parentView.colour');
    }.property(),
    appendix: function(){
      return this.get('parentView.parentView.content.appendix');
    }.property(),
    hasParty: function(){
      return (this.get('content.party') !== null);
    }.property(),
    tooltip: function(){
      var res = 'tooltip-';
      var symbol = this.get('eventSymbol');
      return res + Checklist.Helpers.symbolAsText(symbol);
    }.property(),

    positionInPixels: function(){
      var total = this.get('parentView.parentView.parentView.parentView.totalWidthInPixels');
      var leftOffset = this.get('parentView.parentView.parentView.leftOffsetInPixels');
      var iconOffset = 10;//so that icon is centered
      return (this.get('content.pos') * (total - leftOffset)) + leftOffset - iconOffset;
    }.property().volatile(),

    eventSymbol: function(){
      if (this.get('content.change_type_name') == 'ADDITION'){
        return '+';
      } else if (this.get('content.change_type_name') == 'DELETION'){
        return '-';
      } if (this.get('content.change_type_name') == 'RESERVATION'){
        return Em.I18n.t('timeline.event.symbol.reservation');
      } if (this.get('content.change_type_name') == 'RESERVATION_WITHDRAWAL'){
        return Em.I18n.t('timeline.event.symbol.reservation_withdrawal');
      } if (this.get('content.change_type_name') == 'AMENDMENT'){
        return Em.I18n.t('timeline.event.symbol.amendment');
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
      if (this.get('content.change_type_name') == 'ADDITION' ||
        this.get('content.change_type_name') == 'AMENDMENT'){
        return Em.I18n.t('timeline.event.description.addition') + this.get('appendix');
      } else if (this.get('content.change_type_name') == 'DELETION'){
        return Em.I18n.t('timeline.event.description.addition') + this.get('appendix');
      } else if (this.get('content.change_type_name') == 'RESERVATION'){
        return Em.I18n.t('timeline.event.description.reservation');
      } else if (this.get('content.change_type_name') == 'RESERVATION_WITHDRAWAL'){
        return Em.I18n.t('timeline.event.description.reservation_withdrawal');
      }
    }.property(),

    attributeBindings: ['style', 'title', 'href'],
    style: function() {
      return 'left:' + this.get('positionInPixels') + 'px';
    }.property('parentView.parentView.parentView.parentView.totalWidthInPixels'),
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
        extraOffsetX: 14,
        extraOffsetY: 2,
        tooltipStructure:
        '<div class="custom-tooltip"><div class="ico-tooltip ' + this.get('eventClass') + '">' +
        this.get('eventSymbol') +'</div><div class="tooltip-text"></div>' +
        '<div class="tooltip-decor"></div></div>'
      });

      this.$().colorbox(Checklist.CONFIG.colorbox);
    }
  })
});

