class Users::SessionsController < Devise::SessionsController
  # before_filter :configure_sign_in_params, only: [:create]
  #respond_to :js
 # layout false
  # GET /resource/sign_in
  # def new
  #   super
  # end
  # POST /resource/sign_in
  def create
    self.resource = warden.authenticate(auth_options)

    if resource && resource.active_for_authentication?
      sign_in(resource_name, resource)
    end
    respond_to do |format|
      format.html { redirect_to root_url }
      format.js {}
    end
  end

# DELETE /resource/sign_out
 #def destroy
 # super
 #end

# protected

# You can put the params you want to permit in the empty array.
# def configure_sign_in_params
#   devise_parameter_sanitizer.for(:sign_in) << :attribute
# end
end
