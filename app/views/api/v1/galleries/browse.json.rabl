object @gallery

attributes  *Gallery.column_names,:next, :prev,:first,:last,:tag_list,:dislike,:like

child :arts do
  attributes :id, :getUrl, :name,:country,:city,:lat,:lng, :getSmallUrl,:orientation

end

child :allocations do
  attributes *Allocation.column_names
  
end