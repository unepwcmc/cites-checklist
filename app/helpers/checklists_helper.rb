module ChecklistsHelper
  def taxon_forest(taxons)
    content_tag(:ul) do
      taxons.map { |taxon| taxon_tree(taxon) }.join.html_safe
    end
  end

  def taxon_tree(taxon)
    rank = taxon.rank && taxon.rank.name.html_safe
    content_tag(:li) do
      content_tag(:span, rank, :class => 'rank') +
      content_tag(:span, taxon.taxon_name.scientific_name.html_safe, :class => "taxon #{rank}") + 
      content_tag(:span,taxon.designation.name.html_safe, :class => 'designation') +
      content_tag(:p, taxon_relationships(taxon)) +
      taxon_forest(taxon.children)
    end
  end

  def taxon_relationships(taxon)
    r = ''.html_safe
    if !taxon.wholes.empty?
      r += content_tag(:strong, "is part of") + taxon.wholes.map(&:taxon_name).map(&:scientific_name).join(',').html_safe
    end
    if !taxon.parts.empty?
      r += content_tag(:strong, "consists of") + taxon.parts.map(&:taxon_name).map(&:scientific_name).join(',').html_safe
    end
    if !taxon.synonyms.empty?
      r += content_tag(:strong, "synonym") + taxon.synonyms.map(&:taxon_name).map(&:scientific_name).join(',').html_safe
    end
    r
  end
end
