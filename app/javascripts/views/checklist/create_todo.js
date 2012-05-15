Checklist.CreateTodoView = Ember.TextField.extend({
  insertNewline: function() {
    var value = this.get('value');

    if (value) {
      Checklist.checklistController.createTodo(value);
      this.set('value', '');
    }
  }
});