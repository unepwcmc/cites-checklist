Checklist.checklistController = Ember.ArrayController.create({
  content: [],//Checklist.store.findAll(Checklist.taxonTree),
/*
  load: function(todo_ary) {
    todo_ary.forEach(function(todo) {
      var obj = Checklist.checklistController.createTodo(todo['title']);
    });
  },
*/
  createTodo: function(title) {
    var todo = Checklist.TaxonTree.create({ title: title });
    this.pushObject(todo);
  },

  clearCompletedChecklist: function() {
    this.filterProperty('isDone', true).forEach(this.removeObject, this);
  },

  remaining: function() {
    return this.filterProperty('isDone', false).get('length');
  }.property('@each.isDone'),

  isEmpty: function() {
    return this.get('length') === 0;
  }.property('length'),

  allAreDone: function(key, value) {
    if (arguments.length === 2) {
      this.setEach('isDone', value);

      return value;
    } else {
      return !this.get('isEmpty') && this.everyProperty('isDone', true);
    }
  }.property('@each.isDone')
});
