Checklist.IdMaterialsView = Ember.View.extend({
  templateName: 'id_materials_view',  
  idMaterials: [
    {
      title: 'The title goes here',
      languagesString: 'EN, FR, ES'
    },
    {
      title: 'The title goes here',
      languagesString: 'EN, FR, ES'
    },
    {
      title: 'The title goes here',
      languagesString: 'EN, FR, ES'
    },
    {
      title: 'The title goes here',
      languagesString: 'EN, FR, ES'
    },
    {
      title: 'The title goes here',
      languagesString: 'EN, FR, ES'
    },
    {
      title: 'The title goes here',
      languagesString: 'EN, FR, ES'
    },
    {
      title: 'The title goes here',
      languagesString: 'EN, FR, ES'
    },
  ],

  downloadIdManualEntries: function () {
    console.log(this.get('taxonConceptName'))
    console.log(this.get('taxonConceptId'))
  }
});
