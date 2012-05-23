Checklist.CountrySelect = Em.Select.extend({
  viewName: "select",
  contentBinding: "Checklist.CountryController",
  selectionBinding: "Checklist.SelectedCountryController.country",
  optionLabelPath: "content.iso_name",
  optionValuePath: "content.id",
  prompt: "Please select"
});