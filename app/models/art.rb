class Art < ActiveRecord::Base
  dragonfly_accessor :image do
    #copy_to(:image_normal){|a| a.thumb('800x600>')}
    #copy_to(:image_thumbnail){|a| a.thumb('200x100>')}
    #copy_to(:image_small){|a| a.thumb('400x200>')}
  end
  dragonfly_accessor :image_normal
  dragonfly_accessor :image_thumbnail
  dragonfly_accessor :image_small

  has_many :allocations
  has_many :galleries, :through => :allocations
  accepts_nested_attributes_for :galleries
  accepts_nested_attributes_for :allocations


 


  validates :image, presence: true
  #we only want pictures
  #maybe a config for picture formats?
  validates_property :format, of: :image, in: [:jpeg, :jpg, :png, :bmp], case_sensitive: false,
                   message: "should be either .jpeg, .jpg, .png, .bmp", if: :image_changed?
                   
                
 #if the orientation is set in the image we can rotate it                   
  def rotate_it
    if self.image.stored?
		  case self.orientation
		    when 8..7
				  image.rotate!(270)
				  self.orientation = 1
	      when 3..4
				  image.rotate!(180)
				  self.orientation = 1
		    when 5..6
				  image.rotate!(90)
				  self.orientation = 1
		    end
	   end
  end                 

  def getUrl
    if self.image_normal.nil?
      self.image_normal = self.image.thumb('800x600>')
      self.save
    end
    self.image_normal.url
  end
  
  def getThumbUrl
    if self.image_thumbnail.nil?
       self.generateThumbUrl
    end
    self.image_thumbnail.url
  end
  
  def generateThumbUrl
	self.image_thumbnail = self.image.thumb('200x100#')
    self.save
  end
  
  def getSmallUrl
    if self.image_small.nil?
      self.image_small = self.image.thumb('400x200>')
      self.save
    end
    self.image_small.url
  end
  
  def isInGallery?
    galleries = Gallery.joins(:arts).where('arts.id = ?', self.id.to_s)
    if galleries.length >0
      return true
    end
    return false
  end
  
  
  
  before_save do
    self.name = ActionView::Base.full_sanitizer.sanitize(self.name)
    self.country = ActionView::Base.full_sanitizer.sanitize(self.country)
    self.city = ActionView::Base.full_sanitizer.sanitize(self.city)
    self.state = ActionView::Base.full_sanitizer.sanitize(self.state)
  end

end
