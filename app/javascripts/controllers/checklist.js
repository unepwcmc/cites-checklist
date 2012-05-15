Checklist.checklistController = Ember.ArrayController.create({
  content: [],//Checklist.store.findAll(Checklist.taxonTree),

  load: function(todo_ary) {
    todo_ary.forEach(function(todo) {
      var obj = Checklist.checklistController.createTodo(todo['title']);
    });
  },

  createTodo: function(title) {
    var todo = Checklist.TaxonTree.create({ title: title });
    this.pushObject(todo);
  }
});
