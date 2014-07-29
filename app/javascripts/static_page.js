Checklist.StaticPage = {
  getCompiledTemplate: function(templateName){
    var promise = new RSVP.Promise();
    var template = templateName + '_' + Em.I18n.currentLocale;
    var compiledTemplate = Ember.TEMPLATES[template];
    if (compiledTemplate === undefined){
      $.ajax({
        url: '/' + template + '.html',
        dataType: 'html',
        success: function(data){
          compiledTemplate = Ember.Handlebars.compile(data);
          Ember.TEMPLATES[templateName] = compiledTemplate;
          promise.resolve(template);
        },
        error: function(xhr, msg){
          promise.reject(msg);
        }
      });
    }
    return promise;
  }
};
