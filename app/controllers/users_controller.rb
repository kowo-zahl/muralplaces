# encoding: UTF-8

class UsersController < ApplicationController
  before_filter :get_user, :only => [:index,:new,:edit]
  before_filter :accessible_roles, :only => [:new, :edit, :show, :update, :create]
  load_and_authorize_resource
  skip_authorize_resource :only => [:show,:edit,:update,:destroy]
=begin
alle update und create Sachen in diesem Controller sind für den Admin, damit er die User verwalten kann
Alle normalen Sachen werden über standard devise verarbeitet
=end
  # GET /users
  # GET /users.xml
  # GET /users.json                                       HTML and AJAX
  #-----------------------------------------------------------------------
  def index
    if current_user.has_role? :admin
      @users = User.accessible_by(current_ability, :index).limit(20)
      respond_to do |format|
        format.html
      end
    else
      redirect_to :root
    end
  end

  # GET /users/new
  # GET /users/new.xml
  # GET /users/new.json                                    HTML AND AJAX
  #-------------------------------------------------------------------
  def new
    if current_user.has_role? :admin
      @user = User.new
      respond_to do |format|
        format.html { render :new => @user  }
      end
    else
      redirect_to :root
    end
  end

  # GET /users/1
  # GET /users/1.xml
  # GET /users/1.json                                     HTML AND AJAX
  #-------------------------------------------------------------------
  def show
    @user = User.find(params[:id])
    unless ((@user == current_user) || (current_user.has_role? :admin))
      redirect_to :back, :alert => "Zugriff verweigert."
    else
      redirect_to edit_user_path(@user)
    end

  rescue ActiveRecord::RecordNotFound
    respond_to_not_found(:json, :xml, :html)
    end

  # GET /users/1/edit
  # GET /users/1/edit.xml
  # GET /users/1/edit.json                                HTML AND AJAX
  #-------------------------------------------------------------------
  def edit
    @user = User.find(params[:id])
    unless ((@user == current_user) || (current_user.has_role? :admin))
      redirect_to root_path, :notice => "Zugriff verweigert."
    else
      respond_to do |format|
        format.html
      end
    end
  rescue ActiveRecord::RecordNotFound
    respond_to_not_found(:json, :xml, :html)
    end

  # DELETE /users/1
  # DELETE /users/1.xml
  # DELETE /users/1.json                                  HTML AND AJAX
  #-------------------------------------------------------------------
  def destroy
    @user = User.find(params[:id])
  #  unless ((@user == current_user) || (current_user.has_role? :admin))
  unless (current_user.has_role? :admin)
      redirect_to :back, :alert => "Zugriff verweigert."
      return
    end
    unless @user.has_role? :admin
      @user.destroy!

      respond_to do |format|
        format.html { redirect_to users_path, notice:  I18n.t('deluser') }
      end
    else
      redirect_to users_path, notice:  I18n.t('nodeluser')
    end

  rescue ActiveRecord::RecordNotFound
    respond_to_not_found(:json, :xml, :html)
    end

  # POST /users
  # POST /users.xml
  # POST /users.json                                      HTML AND AJAX
  #-----------------------------------------------------------------
  def create
    if current_user.has_role? :admin
      @user = User.new(user_params)
      puts "hallo--------------------"
      puts @user.errors.count
      if @user.save
        respond_to do |format|
          format.html { redirect_to users_path, notice: "Neuer Nutzer angelegt." }
        end
      else
        respond_to do |format|
        #"Eingaben nicht korrekt."
          flash.now[:notice]= @user.errors.full_messages.join(' & ')
          format.html { render "new"}
        end
      end
    else
      redirect_to :root
    end
  end

  # PUT /users/1
  # PUT /users/1.xml
  # PUT /users/1.json                                            HTML AND AJAX
  #----------------------------------------------------------------------------
  def update

    @user = User.find(params[:id])
    #nur admin und der betreffende User hat hier was zu suchen.
    unless ((@user == current_user) || (current_user.has_role? :admin))
      redirect_to root_path, :alert => "Zugriff verweigert."
    end
    #nur wenn der Admin in fremden Useraccounts rumwerkelt braucht er nicht das aktuelle pw,
    #bei seinem eigenen Account muss er sein pw eingeben, wie jeder nutzer
    if (current_user.has_role? :admin) && !(@user==current_user)

      if params[:user][:password].blank?
        [:password,:password_confirmation,:current_password].collect{|p| params[:user].delete(p) }
      else
        if params[:user][:password]!=params[:user][:password_confirmation]
          redirect_to :back, :notice => "Passwörter nicht gleich."
          return
        end
      end

      respond_to do |format|
        if @user.update_attributes(user_params)
          format.html { redirect_to users_url, notice: "Der Nutzeraccount wurde geupdated." }
        else
          format.html { redirect_to :back, notice: "Ein Fehler ist aufgetreten" }
        end
        return
      end
    end

    if (@user==current_user)
      if params[:user][:password].blank?
        [:password,:password_confirmation].collect{|p| params[:user].delete(p) }
      else
        if params[:user][:password]!=params[:user][:password_confirmation]
          redirect_to :back, :notice => "Passwörter nicht gleich."
          return
        end
      end
      respond_to do |format|

        if @user.update_with_password(user_params)
          format.html { redirect_to root_url, notice: "Der Nutzeraccount wurde geupdated." }
        else
          if @user.valid_password?(params[:user][:current_password])
            format.html { redirect_to :back, notice: "Ein Fehler ist aufgetreten." }
          else
            format.html { redirect_to :back, notice: "Aktuelles Passwort falsch." }

          end
        end
      end
    end



  rescue ActiveRecord::RecordNotFound
    respond_to_not_found(:js, :xml, :html)
    end

  # Get roles accessible by the current user
  #----------------------------------------------------
  def accessible_roles
    @accessible_roles = Role.accessible_by(current_ability,:read)
  end

  # Make the current user object available to views
  #----------------------------------------
  def get_user
    @current_user = current_user
  end

  private

  def user_params
    params.require(:user).permit(:username,:email, :password, :encrypted_password, :current_password, {:role_ids => []})
  end
end
