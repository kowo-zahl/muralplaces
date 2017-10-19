class GalleriesController < ApplicationController
  before_action :set_gallery, only: [:show, :edit, :update, :destroy]
  load_and_authorize_resource
  skip_authorize_resource :only => [:browse,:index,:maps]
  #like index, but it only show galleries from a specific user
  def showGalleries
    @galleries = Gallery.where(user: current_user.id.to_s).order('updated_at DESC').page(params[:page]).per_page(12)
    render "showGalleries"
  end

  #Sort galleries by city
  def maps
    @cities =  Art.joins(:galleries).where("galleries.show =  true and arts.city <> '' ").pluck("city").uniq!

    if params[:city].to_s != ""
      @city= params[:city].to_s== "oa" ? "" : params[:city].to_s
      search = "galleries.show = true and arts.city = '"+@city+"'"
      @galleries = Gallery.joins(:arts).where(search.to_s).distinct
    return
    end
    @galleries = Gallery.where(show: true).order('id DESC')
  end

  ##To style SimpleForm is sometimes pretty annoying
  def browse

    @isUser = (signed_in? && @gallery.user.to_i == current_user.id.to_i)
=begin
@number = @gallery.id

#This can only be, if someone tests id's
unless @gallery.show
redirect_to root_url
else
render "browse"
end
=end
    @city=""
    @tag=""
    #browse galleries by tag
    if params[:tag].to_s != ""
      @galleries = Gallery.tagged_with(params[:tag].to_s).where(show: true).order('id DESC')
      @galleries.each_with_index do |gal,index|
        if gal.id == @gallery.id
          unless index.to_i+1 >= @galleries.count
            @next = @galleries[index.to_i+1].id
          end
          unless index.to_i <= 2
            @prev = @galleries[index-1].id
          end
        end
      end
      @tag = params[:tag].to_s
    return
    end
    #browse galleries by city
    if params[:city].to_s != ""
      @city= params[:city].to_s== "oa" ? "" : params[:city].to_s
      search = "galleries.show = true and arts.city = '"+@city+"'"
      @galleries = Gallery.joins(:arts).where(search.to_s).distinct
      @galleries.each_with_index do |gal,index|

        if gal.id == @gallery.id
          unless index.to_i+1 >= @galleries.count
            @next = @galleries[index.to_i+1].id
          end
          unless index.to_i <= 2
            @prev = @galleries[index-1].id
          end
        end
      end

    return
    end
    #browse galleries just from start to finish
    @galleries = Gallery.where(show: true).order('id DESC')
    @galleries.each_with_index do |gal,index|
      if gal.id == @gallery.id
        unless index.to_i+1 >= @galleries.count
          @next = @galleries[index.to_i+1].id
        end
        unless index.to_i <= 2
          @prev = @galleries[index-1].id
        end
      end
    end

  end

  # GET /galleries
  # show all galleries with show == true
  def index
    @city=""
    @tag=""
    @cssclass=""
    @cities =  Art.joins(:galleries).where("galleries.show =  true and arts.city <> '' ").pluck("city").uniq!

    if params[:tag].to_s != ""
      @galleries = Gallery.tagged_with(params[:tag].to_s).where(show: true).page(params[:page]).per_page(16).order('id DESC')
      @tag = params[:tag].to_s
    return
    end

    if params[:city].to_s != ""
      search = "galleries.show = true and arts.city = '"+params[:city].to_s+"'"
      @galleries = Gallery.joins(:arts).where(search.to_s).distinct.page(params[:page]).per_page(16)
      @city=params[:city].to_s
    return
    end

    @galleries = Gallery.where(show: true).page(params[:page]).per_page(16).order('id DESC')
  end

  # GET /galleries/1
  def show
    @arts = Array.new()
    @gallery.art_ids.each do |aid|
      @arts << Art.find(aid)
    end
    @artsall = Art.where(uploader: current_user.id.to_s).order('updated_at DESC')
  end

  # GET /galleries/new
  def new
    @gallery = Gallery.new()
    @arts = Art.where(uploader: current_user.id).distinct
    @arts3= Art.joins(:galleries).where(uploader: current_user.id).distinct
    @arts2= Art.where(uploader: current_user.id).distinct - Art.joins(:galleries).where(uploader: current_user.id).distinct
  #@arts2 = Art.joins(:gallery).where(uploader: current_user.id)
  # @gallery.save
  # render :show
  end

  # GET /galleries/1/edit
  def edit
    @arts = Art.where(uploader: current_user.id).distinct
    @arts3= Art.joins(:galleries).where(uploader: current_user.id).distinct
    @arts2= Art.where(uploader: current_user.id).distinct - Art.joins(:galleries).where(uploader: current_user.id).distinct
  end

  # POST /galleries
  # POST /galleries.json
  def create
    #unsere art_ids sind leider nicht uniq, darum kümmern wir uns hier
    mod_params = gallery_params
    unless gallery_params["art_ids"].is_a? String
      mod_params["art_ids"] = gallery_params["art_ids"].uniq!
    end

    if gallery_params["thumbUrl"].to_s == ""
      #Wenn kein Thumb gewählt worden ist, nehmen wir einfach das erste Bild
      if mod_params["thumbArt"].to_s.chars.length == 0
        mod_params["thumbArt"] = Art.find(mod_params["art_ids"].first.to_i).id
      end
    end
    #galleryeintrag erzeugen
    @gallery = Gallery.new(mod_params)
    @gallery.user = current_user.id.to_s
    if @gallery.save
      redirect_to galleries_url, notice: 'Gallery was successfully created.'
    else
      render :new
    end
  end

  # PATCH/PUT /galleries/1
  #TODO: Fremde User drüfen Tags setzen
  def update
    if @gallery.user = current_user.id.to_s
      if @gallery.update(gallery_params)
        redirect_to @gallery, notice: 'Gallery was successfully updated.'
      else
        render :edit
      end
    else
      redirect_to @gallery, notice: 'You are not allowed to chance this.'

    end
  end

  # DELETE /galleries/1
  def destroy
    @gallery.destroy
    redirect_to galleries_url, notice: 'Gallery was successfully destroyed.'
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_gallery
    @gallery = Gallery.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def gallery_params
    params.require(:gallery).permit(:tag_list,:show,:utext,:dtext,:thumbArt,:title,{:art_ids => []},:thumbUrl, :art_ids)
  end

end
