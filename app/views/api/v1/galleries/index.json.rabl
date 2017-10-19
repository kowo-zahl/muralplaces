object @galleries

attributes :thumbUrl, :show,:next, :prev,:first,:last,:tag_list

child :arts do
  attributes :id
end

child :allocations do
  attributes :id
  
end