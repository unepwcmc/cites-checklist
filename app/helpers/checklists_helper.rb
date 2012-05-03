module ChecklistsHelper
  def taxon_forest(taxons)
    content_tag(:ul) do
      taxons.map { |taxon| taxon_tree(taxon) }.join.html_safe
    end
  end
  def taxon_tree(taxon)
    content_tag(:li) do
      taxon.scientific_name.html_safe + 
      ' ['+taxon.institutions.map(&:name).join(',').html_safe + ']' +
      taxon_forest(taxon.children)
    end
  end
end
