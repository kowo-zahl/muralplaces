class ImpressumsController < ApplicationController
  before_action :set_impressum, only: [:update, :destroy]
  load_and_authorize_resource
  skip_authorize_resource :only => [:index]

  #function to chance the position of a triviapage 1 up
  def upi
    Impressum.find(params[:id]).up

    @impressums = Impressum.order(position: :asc)
    redirect_to :back
  end

  #function to chance the position of a triviapage 1 down
  def downi
    Impressum.find(params[:id]).down

    @impressums = Impressum.order(position: :asc)
    redirect_to :back
  end

  # GET /impressums
  # GET /impressums.json
  def index
    @impressums = Impressum.order(position: :asc)
  end

  # GET /impressums/1
  # GET /impressums/1.json
  def show
    redirect_to impressums_url
  end

  # GET /impressums/new
  def new
   @impressum = Impressum.new
    respond_to do |format|
     format.html{redirect_to impressums_url}
     format.js {}
    end
  end
  # GET /impressums/1/edit
  def edit
     respond_to do |format|
      format.html{redirect_to impressums_url}
      format.js {}
    end
  end

  # POST /impressums
  # POST /impressums.json
  def create
    @impressum = Impressum.new(impressum_params)
    @impressum.position=Impressum.all.count+1
    respond_to do |format|
      if @impressum.save
        format.html { redirect_to impressums_url, notice: I18n.t('ecreate') }
      else
        format.html { render :new }
      end
    end
  end

  # PATCH/PUT /impressums/1
  # PATCH/PUT /impressums/1.json
  def update
    respond_to do |format|
      if @impressum.update(impressum_params)
        format.html { redirect_to impressums_url, notice: I18n.t('eupdated') }
      else
        format.html { render :edit }
      end
    end
  end

  # DELETE /impressums/1
  # DELETE /impressums/1.json
  def destroy
    @impressum.destroy
    rebuild Impressum
    respond_to do |format|
      format.html { redirect_to impressums_url, notice: I18n.t('edestroy') }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_impressum
      @impressum = Impressum.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def impressum_params
      params.require(:impressum).permit(:text, :position)
    end
end
