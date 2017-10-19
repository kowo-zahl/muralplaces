#This Class provides the Functionality for the Models with position posts
class Position < ActiveRecord::Base
    self.abstract_class = true
    validates :position, presence: true, allow_blank: false
  
    def up 
    
    if self.position.nil?
      self.position=self.class.all.count+1
    end
    
    unless self.position<=1
      old = self.class.where("position = :pos", {pos: self.position-1}).first
      unless old.nil?
        old.position=self.position
        old.save
      end
      self.position=self.position-1
      self.save
    end
    
  end
  
    def down 
    if self.position.nil?
      self.position=self.class.all.count+1
    end
    
    unless self.position>=self.class.all.count
      old = self.class.where("position = :pos", {pos: self.position+1}).first
      unless old.nil?
        old.position=self.position
        old.save
      end
      self.position=self.position+1
      self.save
    end
  end
end
