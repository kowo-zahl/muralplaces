class ArtsController < ApplicationController
  before_action :set_art, only: [:show, :edit, :update, :destroy]
  load_and_authorize_resource
  skip_authorize_resource :only => [:show]
  # GET /arts
  def index
    @arts = Art.where(uploader: current_user.id).order(id: :desc).page(params[:page]).per_page(12)
  end

  # GET /arts/1
  def show
    @galleries = Gallery.joins(:arts).where('arts.id = ?', @art.id.to_s)
    
    
    
    unless current_user.nil? 
         
    
    unless (@art.uploader.to_i == current_user.id) || (current_user.has_role? :admin) || !@galleries.nil?
      redirect_to :browse
      return
    end
    end
    if current_user.nil? && @galleries.nil?
      redirect_to :browse
      return
    end
    @isUser = (signed_in? && @art.uploader.to_i == current_user.id.to_i)
  end

  # GET /arts/new
  def new
    @art = Art.new
  end

  # GET /arts/1/edit
  def edit
  end

  # POST /arts
  def create
    
    if params[:nutzung].to_s!="on"
      render :new, notice: 'Bitte bestätigen Sie unsere Nutzungsbedingungen.' 
      return
    end
    
    
    #wir ignorieren den normalen rails createprozess, da wir mehr als ein Bild haben könnten.
    #wir bekommen mit data ein json mit allen Bildern geliefert.
    if params[:data].to_s==""
      render :new, notice: 'Bitte ein Bild auswählen.' 
      return
    end
    
    
    unless (@art.uploader.to_i == current_user.id) || (current_user.has_role? :admin)
      redirect_to :browse
    else
      data = JSON.parse(params[:data].to_s);
      files = params[:images]

      files.each do |f|
        data.each do |d|
          if(f.original_filename === d[0])
            @art = Art.new();
            @art.uploader = params[:art][:uploader]
            @art.name = d[1]
            @art.lat = d[2]
            @art.lng = d[3]
            @art.city = d[4]
            @art.country = d[5]
            @art.orientation = d[6]
            @art.image = f
            @art.save
            @art.rotate_it
            @art.save
          end
        end

      end

      #   if @art.save
      #Lassen wir noch da um später eine Möglichkeit zu bieten, direkt aus der Artbearbeitung einen Gallerieeintrag zu erstellen
      #         if params["show"]=="on"
      #          gallery = Gallery.new()
      #         gallery.thumbUrl = @art.image.thumb('400x200').url
      #         gallery.arts<<@art
      #        gallery.show = true
      #       gallery.save
      #    end
      @galleries = Gallery.joins(:arts).where('arts.id = ?', @art.id.to_s)
     redirect_to art_path(@art.id), notice: 'Art was successfully created.'
    #    else
    #     render :index
    #  end
    end
  end

  # PATCH/PUT /arts/1
  def update
    unless (@art.uploader.to_i == current_user.id) || (current_user.has_role? :admin)
      redirect_to :browse
    else
      if @art.update(art_params)
        redirect_to @art, notice: 'Art was successfully updated.'
      else
        render :edit
      end
    end
  end

  # DELETE /arts/1
  def destroy
    unless (@art.uploader.to_i == current_user.id) || (current_user.has_role? :admin)
      redirect_to :browse
    else
      @art.destroy
      redirect_to arts_url, notice: 'Art was successfully destroyed.'
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_art
    @art = Art.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def art_params
    params.require(:art).permit(:lat, :lng, :uploader, :name, :country, :city, :state,:rotation,:image,:retained_image )
  end
end
