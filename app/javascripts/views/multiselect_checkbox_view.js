const ALL_ID = '__all__'

Checklist.MultiselectCheckboxView = Ember.View.extend({
  options: [],
  selected: [],
  id: 'multiselect-checkbox',
  tagName: 'fieldset',
  class: '',
  templateName: 'multiselect_checkbox_view',
  areAllSelected: false,

  optionsForView: function () {
    const options = this.get('options').slice(0)

    options.unshift({
      id: ALL_ID,
      label: Em.I18n.t('id_download.all_volumes')
    })

    return options.map(function (option) {
      return {
        id: option.id,
        label: option.label,
        checkboxId: this.getCheckboxId(option.id)
      }
    }.bind(this))
  }.property('id', 'options'),

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

  toggleAllCheckboxes: function () {
    this.areAllSelected = !this.areAllSelected

    if (this.areAllSelected) {
      this.set('selected', this.options.map(function (opt) { return opt.id }))
      this.checkAll()
    } else {
      this.set('selected', [])
      this.uncheckAll()
    }
  },

  select: function (id) {
    this.set('selected', this.get('selected').concat([id]))

    if (this.get('selected').length === this.options.length) {
      this.areAllSelected = true
      this.checkAll()
    }
  },

  deselect: function (id) {
    this.set('selected', this.get('selected').filter(function (currentId) {
      return currentId !== id
    }))

    if (this.get('selected').length === this.options.length - 1) {
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
    return this.get('selected').indexOf(id) >= 0
  }
})