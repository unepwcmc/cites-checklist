Checklist.CustomSearch = Ember.View.extend({
  templateName: 'custom_search',
  didInsertElement: function(event) {
    this.$().children('.custom-holder').openClose({
      activeClass:'expanded',
      opener:'a.btn-custom',
      slider:'div.drop',
      effect:'none',
      animSpeed:500
    });
  }
});

Checklist.SortingCheckbox = Ember.Checkbox.extend({
  change: function(event) {
    var filters = Checklist.get('router').get('filtersController').toParams();
    var params = $.param(filters);

    Checklist.get('router').transitionTo('search',{params: params});
  }
});

Checklist.UnfoldHistoryCheckbox = Ember.Checkbox.extend({
  change: function(){
    $('.listing-item').toggleClass('expanded');
    $('.opener-holder').fadeToggle();
    $('.slide').slideToggle();
  }
});

Checklist.SortingRadioButton = Ember.View.extend({
  isChecked: true,

  group: "radio_button",
  customId: "",
  className: "",

  value: '',
  title: '',

  classNames: ['ember-radio-button'],
  defaultTemplate: Ember.Handlebars.compile('<input type="radio" name="{{unbound view.group}}" value="{{unbound view.value}}" id="{{unbound view.customId}}" class="{{unbound view.className}}" /> <label for="{{unbound view.customId}}">{{unbound view.title}}</label>')
});
