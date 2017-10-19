class Ability
  include CanCan::Ability

  def initialize(user)
    
    user ||= User.new # guest user (not logged in)
    
    if user.has_role? :admin
      can :manage, :all
    end

    if user.has_role? :registered
      can :manage, Art
      can :manage, :comment
      can :manage, Gallery
      can :manage, Allocation
    end 
  end
end
