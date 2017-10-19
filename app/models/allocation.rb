class Allocation < ActiveRecord::Base
  belongs_to :art
  belongs_to :gallery
  
  before_save do
    self.text = ActionView::Base.full_sanitizer.sanitize(self.text)
  end
end
