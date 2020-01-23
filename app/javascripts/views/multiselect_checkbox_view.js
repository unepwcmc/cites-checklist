Checklist.MultiselectCheckboxView = Ember.View.extend({
  options: [
    {label: 'Vol 1', id:'1'},
    {label: 'Vol 2', id:'2'},
    {label: 'Vol 3', id:'3'},
    {label: 'Vol 4', id:'4'},
    {label: 'Vol 5', id:'5'},
  ],
  selected: [],
  id: 'multiselect-checkbox',
  tagName: 'fieldset',
  class: '',
  templateName: 'multiselect_checkbox_view',

  optionsForView: function () {
    return this.get('options').map(function (option) {
      return {
        id: option.id,
        label: option.label,
        checkboxId: this.get('id') + '-checkbox-' + option.id
      }
    }.bind(this))
  }.property('id', 'options'),

  select: function (id) {
    this.selected.push(id)
  },

  deselect: function (id) {
    this.selected = this.selected.filter(function (currentId) {
      return currentId !== id
    })
  },

  isSelected: function (id) {
    return this.selected.indexOf(id) >= 0
  },

  toggleCheckbox: function (event) {
    console.log(this.selected)

    const id = event.target.value

    if (this.isSelected(id)) {
      this.deselect(id)
    } else {
      this.select(id)
    }
    console.log('after', this.selected)
  },
})