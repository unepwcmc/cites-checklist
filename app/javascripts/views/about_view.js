Checklist.AboutView = Ember.View.extend({
  tagName: 'section',
  templateName: 'about_page',

  classNames: ['about-main'],

  didInsertElement: function () {
    this.$('.scroll-to').each(function (_, linkEl) {
      $(linkEl).on("click", function () { 
        const anchorId = $(this).data('anchor-id')

        $('#' + anchorId)[0].scrollIntoView()
      })
    })
  }
});
