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
      return (this.get('content.notes') !== null);
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
      var party = this.get('content.party');
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
        extraOffsetX: -2,
        extraOffsetY: 2,
        tooltipStructure:
        '<div class="custom-tooltip"><div class="ico-tooltip">' +
        this.get('eventSymbol') +'</div><div class="tooltip-text"></div>' +
        '<div class="tooltip-decor"></div></div>'
      });

      this.$().fancybox({
        padding: 10,
        cyclic: false,
        overlayShow: true,
        overlayOpacity: 0.65,
        overlayColor: '#000',
        titlePosition: 'inside',
        onComplete: function(box) {
          if(link.attr('href').indexOf('#') === 0) {
            jQuery('#fancybox-content').find('a.close').unbind('click.fb').bind('click.fb', function(e){
              jQuery.fancybox.close();
              e.preventDefault();
            });
          }
        }
      });

    }
  })
});

