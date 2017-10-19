class Gallery < ActiveRecord::Base
    acts_as_commentable
    acts_as_votable
    acts_as_taggable
    acts_as_taggable_on :tag_list
    #TODO: Sanitize Tags
    has_many :allocations
    has_many :arts, :through => :allocations
    accepts_nested_attributes_for :arts
    accepts_nested_attributes_for :allocations

#get likes and dislikes
  def like
    self.get_likes.size
  end  
  
  def dislike
    self.get_dislikes.size
  end  
  
  
  
  #gives us the least updated gallery item  
  def first
    gall=Gallery.where(:show => true).order("updated_at ASC").first
    return gall.nil? ? 0:gall.id
  end

  #gives us the latest updated gallery item 
  def last
    gall=Gallery.where(:show => true).order("updated_at DESC").first
    return gall.nil? ? 0:gall.id
  end
  
  def next
   nxt = Gallery.where(:show => true).where("updated_at > ?", self.updated_at).order("updated_at ASC").first
   return nxt.nil? ? last : nxt.id  
  end

  def prev
    pev=Gallery.where(:show => true).where("updated_at < ?", self.updated_at).order("updated_at DESC").first
    return pev.nil? ? first : pev.id  
  end

 #set one of the arts as thumbnail  
  def setThumbnail
    if self.arts.count == 0
      self.thumbUrl = ''
      return
    end
    if self.thumbArt.to_i == 0
      self.thumbArt = self.arts.first.id
    end
   self.thumbUrl = Art.find(self.thumbArt.to_i).getThumbUrl 
  end
  
#maybe overkill with the sanitizers, but better save than sorry  
  before_save do
    self.title = ActionView::Base.full_sanitizer.sanitize(self.title)
    self.utext = ActionView::Base.full_sanitizer.sanitize(self.utext)
    self.dtext = ActionView::Base.full_sanitizer.sanitize(self.dtext)
    self.setThumbnail
  end

end
