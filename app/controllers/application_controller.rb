class ApplicationController < ActionController::Base
  before_action :configure_permitted_parameters, if: :devise_controller?
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  
    #Ausnahmebehandlung für CanCanCan
  rescue_from CanCan::AccessDenied do |exception|
    redirect_to root_url, :alert => exception.message
  end
#wenn ein item gelöscht wird
#sorgen wir dafür das es keine Lücken im Positionsindex gibt.
  def rebuild (itemModel)
    items = itemModel.order(position: :asc)
    zahl=1
    items.each do |item|
      item.position =zahl
      item.save
      zahl=zahl+1
    end

  end
  
  #for devise to update users
def configure_permitted_parameters
    devise_parameter_sanitizer.for(:sign_up) { |u| u.permit(:username, :email, :password, :password_confirmation, :remember_me) }
    devise_parameter_sanitizer.for(:sign_in) { |u| u.permit(:login, :username, :email, :password, :remember_me) }
    devise_parameter_sanitizer.for(:account_update) { |u| u.permit(:username, :email, :password, :password_confirmation, :current_password) }
end



  # Overwriting the sign_out redirect path method
def after_sign_out_path_for(resource_or_scope)
  root_url
end
end
