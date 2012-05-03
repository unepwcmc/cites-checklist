class ChecklistsController < ApplicationController
  def index
    @animalia = Taxon.find_by_scientific_name('Animalia')
    @plantae = Taxon.find_by_scientific_name('Plantae')
  end
end
