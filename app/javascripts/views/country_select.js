Checklist.CountrySelect = Em.Select.extend({
  multiple: true,
  viewName: "countryFilter",
  contentBinding: "Checklist.CountryController",
  selectionBinding: "Checklist.SelectedCountriesController.countries",
  optionLabelPath: "content.name",
  optionValuePath: "content.id"/*,
  prompt: "Please select"*/
});