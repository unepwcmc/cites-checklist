Checklist.CountrySelect = Em.Select.extend({
  multiple: true,
  viewName: "countryFilter",
  contentBinding: "Checklist.countryController",
  selectionBinding: "Checklist.selectedCountriesController.countries",
  optionLabelPath: "content.name",
  optionValuePath: "content.id"/*,
  prompt: "Please select"*/
});