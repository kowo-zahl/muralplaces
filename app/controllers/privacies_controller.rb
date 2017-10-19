class PrivaciesController < ApplicationController
before_action :set_privacy, only: [:update, :destroy]
load_and_authorize_resource
skip_authorize_resource :only => [:index]

  #function to chance the position of a triviapage 1 up
  def upspr
    Privacy.find(params[:id]).up

    @privacies = Privacy.order(position: :asc)
    redirect_to :back
  end

  #function to chance the position of a triviapage 1 down
  def downspr
    Privacy.find(params[:id]).down

    @@privacies = Privacy.order(position: :asc)
    redirect_to :back
  end

  # GET /privacies
  # GET /privacies.json
  def index
    @privacies = Privacy.order(position: :asc)
  end

  # GET /privacies/1
  # GET /privacies/1.json
  def show
    redirect_to privacies_url
  end
  # GET /privacies/new
  def new
    @privacy = Privacy.new
    respond_to do |format|
     format.html{redirect_to privacies_url}
     format.js {}
    end
  end

  # GET /privacies/1/edit
  def edit
     respond_to do |format|
      format.html{redirect_to privacies_url}
      format.js {}
    end
  end

  # POST /privacies
  # POST /privacies.json
  def create
    @privacy = Privacy.new(privacy_params)
    @privacy.position = Privacy.all.count+1

    respond_to do |format|
      if @privacy.save
        format.html { redirect_to privacies_url, notice: I18n.t('ecreate') }
      else
        format.html { render :new }
      end
    end
  end

  # PATCH/PUT /privacies/1
  # PATCH/PUT /privacies/1.json
  def update
    respond_to do |format|
      if @privacy.update(privacy_params)
        format.html { redirect_to privacies_url, notice: I18n.t('eupdated') }
      else
        format.html { render :edit }
      end
    end
  end

  # DELETE /privacies/1
  # DELETE /privacies/1.json
  def destroy
    @privacy.destroy
    rebuild Privacy
    respond_to do |format|
      format.html { redirect_to privacies_url, notice: I18n.t('edestroy') }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_privacy
      @privacy = Privacy.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def privacy_params
      params.require(:privacy).permit(:text, :position)
    end
end
