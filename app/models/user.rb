class User < ActiveRecord::Base
    #Devise erweitern, damit wir uns mit einem  Modal einloggen können 
  attr_accessor :login
  rolify
  acts_as_voter
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, :authentication_keys => [:login]

  before_create :set_default_role
  

  def self.find_first_by_auth_conditions(warden_conditions)
    conditions = warden_conditions.dup
    if login = conditions.delete(:login)
      where(conditions).where(["lower(username) = :value OR lower(email) = :value", { :value => login.downcase }]).first
    else
      if conditions[:username].nil?
        where(conditions).first
      else
        where(username: conditions[:username]).first
      end
    end
  end

  validates :username,
  :presence => true,
  :uniqueness => {
    :case_sensitive => false
  }
  validate :validate_username

  def validate_username
    if User.where(email: username).exists?
      errors.add(:username, :invalid)
    end
    self.username = ActionView::Base.full_sanitizer.sanitize(self.username)
  end
  
  
  private

#a user needs to have the role registered to use the page
#this is here if I ever switch to email registration
  def set_default_role
    rol = Role.find_by_name('registered')
    if rol.nil?
      role = Role.new
      role.name = 'registered'
      role.save
      rol = role
    end
    self.role_ids = self.role_ids.insert(-1,rol.id)
  end
end
