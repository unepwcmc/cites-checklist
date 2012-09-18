Checklist.TaxonConceptHistoryView = Em.View.extend({
  tagName: 'div',
  classNames: ['area'],
  templateName: "taxon_concept_history_view",
  content: null,
  contextBinding: 'content',
  totalWidthInPixels: 700,
  afterRender: function(){
    // Initialise history tooltips
    $('a.tooltip').hoverTooltip({
      positionTypeX: 'left',
      positionTypeY: 'top',
      attribute:'title',
      extraOffsetX: -2,
      extraOffsetY: 2,
      tooltipStructure: '<div class="custom-tooltip"><div class="ico-tooltip"></div><div class="tooltip-text"></div><div class="tooltip-decor"></div></div>'
    });

    $('a.more-countries-tooltip').hoverTooltip({
      positionTypeX: 'center',
      positionTypeY: 'bottom',
      attribute:'title',
      extraOffsetX: 15,
      extraOffsetY: 40,
      tooltipStructure: '<div class="country-tooltip"><div class="tooltip-text"></div></div>'
    });
  },
  didInsertElement: function() {
    Ember.run.next(this, function(){
     // code to be executed in the next RunLoop, which will be scheduled after the current one
     this.set('totalWidthInPixels', $('.column').width());
    });
  },
  leftOffsetInPixels: 50,
  yearsOnTimescale: function(){
    return [1975,1985,1995,2005,2015];
  }.property()
});
