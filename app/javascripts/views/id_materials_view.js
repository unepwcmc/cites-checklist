Checklist.IdMaterialsView = Ember.View.extend({
  templateName: 'id_materials_view',
  taxonConceptId: 0,
  idMaterials: [1,2,3,4,5,6],

  downloadIdManualEntries: function () {
    console.log(this.get('taxonConceptId'))
  }
});
