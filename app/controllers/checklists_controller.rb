class ChecklistsController < ApplicationController
  def index
    @animalia = TaxonConcept.find_by_scientific_name('Animalia')
    @plantae = TaxonConcept.find_by_scientific_name('Plantae')
  end
end
