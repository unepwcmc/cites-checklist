Checklist.AppendixBtnView = Ember.View.extend({
  tagName: 'span',

  classNameBindings: ['classes'],
  classes: function() {
    var width = $(window).width();

    if (width > 1200) {
      return "fixed-width";
    }

    return "";
  }.property().volatile(),

  template: Ember.Handlebars.compile("{{view.summary}}"),

  summary: function() {
    var width = $(window).outerWidth(),
        prefix = '';

    if (width > 1200) {
      prefix = Em.I18n.t('search.by_appendix.all') + ' ';
    }

    var appendices = this.get('content');
    if (appendices.length === 0 || appendices.length == 3) {
      return prefix + Em.I18n.t('search.by_appendix.appxs');
    } else {
      return appendices.sort().join(", ");
    }
  }.property("@each"),

  contentDidChange: function() {
    this.set('summary', '');
  }.observes('content'),

  _resizeInterval: null,
  didInsertElement: function() {
    var that = this;
    $(window).resize(function() {
      clearInterval(that.get('_resizeInterval'));

      that.set('_resizeInterval', setInterval(
        function() {
          var width = $(window).width();

          if (width > 1200) {
            $('.appendix-holder .btn span').addClass('fixed-width');
          } else {
            $('.appendix-holder .btn span').removeClass('fixed-width');
          }

          that.set('summary', '');
        },
      100));
    });
  }
});

Checklist.AppendixFormView = Ember.View.extend({
  content: [],
  templateName: 'appendix_form',

  touchEnd: function(e) {
    var $drop = this.$('.drop');
    if ($drop.has($(e.target)).length === 0) {
      $drop.toggleClass('show');
    }
  }
});

Checklist.AppendixFormCollectionView = Ember.CollectionView.extend({
  tagName: 'ul',
  content: [],

  itemViewClass: Ember.View.extend({
    contextBinding: 'content',
    templateName: 'appendix_form_collection',

    classNameBindings: ['classes'],
    classes: function() {
      var abbreviation = this.get('context').get('abbreviation');

      var classes = [];

      switch(abbreviation) {
        case "I":
          classes.push("blue");
          break;
        case "II":
          classes.push("green");
          break;
        case "III":
          classes.push("orange");
          break;
      }

      var selected_appendices = this.get('controller').get('appendices').mapProperty('abbreviation');

      if ($.inArray(abbreviation, selected_appendices) < 0) {
        classes.push("inactive");
      }

      return classes.join(" ");
    }.property().volatile(),

    touchEnd: function(event) {
      this.click(event);
    },

    click: function(event) {
      // The click event fires for list items as well as circles,
      // this is a bit of a hacky method of ignoring list item clicks
      if ($(event.target).not('div').length > 0){
        return;
      }

      var router = Checklist.get('router');
      var filtersController = this.get('controller');

      // Add the selected appendice to the appendice filter array
      // Equivalent to a selectionBinding in a dropdown list
      appendices    = filtersController.get('appendices');
      appendicesIds = filtersController.get('appendicesIds');
      if (appendices.contains(this.get('context'))) {
        appendices.removeObject(this.get('context'));
        appendicesIds.removeObject(this.get('context').get('abbreviation'));
      } else {
        appendices.addObject(this.get('context'));
        appendicesIds.addObject(this.get('context').get('abbreviation'));
      }

      $(event.target).parent().toggleClass('inactive');

      var params = filtersController.toParams();
      router.transitionTo('search', {redraw: false, params: $.param(params)});
    }
  })
});
