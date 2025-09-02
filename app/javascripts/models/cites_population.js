Checklist.CitesPopulation = Ember.Object.extend({
  name: null,
  geo_entity_id: null,
  tag_names: null,
  species_listing_name: null,
  maybe_tag_names: function(){
    var tagNames = this.get('tag_names');

    return (
      tagNames.length
      ? ' (' + tagNames.join(', ') + ')'
      : ''
    )
  }.property(),
});
