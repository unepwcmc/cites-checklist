const ALL_ID = '__all__'

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
  selectAllLabel: 'All volumes',
  areAllSelected: false,

  optionsForView: function () {
    const options = this.get('options').slice(0)

    options.unshift({
      id: ALL_ID,
      label: this.get('selectAllLabel')
    })

    return options.map(function (option) {
      return {
        id: option.id,
        label: option.label,
        checkboxId: this.getCheckboxId(option.id)
      }
    }.bind(this))
  }.property('id', 'options', 'selectAllLabel'),

  getCheckboxId: function (optionId) {
    return this.get('id') + '-checkbox-' + optionId
  },

  toggleCheckbox: function (event) {
    const id = event.target.value

    if (id === ALL_ID) {
      this.toggleAllCheckboxes()
    } else if (this.isSelected(id)) {
      this.deselect(id)
    } else {
      this.select(id)
    }
  },

  toggleAllCheckboxes () {
    this.areAllSelected = !this.areAllSelected

    if (this.areAllSelected) {
      this.selected = this.options.map(function (opt) { return opt.id })
      this.checkAll()
    } else {
      this.selected = []
      this.uncheckAll()
    }
  },

  select: function (id) {
    this.selected.push(id)

    if (this.selected.length === this.options.length) {
      this.areAllSelected = true
      this.checkAll()
    }
  },

  deselect: function (id) {
    this.selected = this.selected.filter(function (currentId) {
      return currentId !== id
    })

    if (this.selected.length === this.options.length - 1) {
      this.areAllSelected = false
      this.uncheckSelectAllCheckbox()
    }
  },

  checkAll: function () {
    this.setCheckboxes(true)
  },

  uncheckAll: function () {
    this.setCheckboxes(false)
  },

  uncheckSelectAllCheckbox: function () {
    this
      .$('#' + this.getCheckboxId(ALL_ID))
      .prop('checked', false)
  },

  setCheckboxes: function (areChecked) {
    this.$('input[type=checkbox]').each(function () {
      $(this).prop('checked', areChecked)
    })
  },

  isSelected: function (id) {
    return this.selected.indexOf(id) >= 0
  },
})