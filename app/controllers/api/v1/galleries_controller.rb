module Api
  module V1
    class GalleriesController < ApplicationController
      before_action :set_gallery, only: [:show, :edit, :update, :destroy]
      load_and_authorize_resource
      skip_authorize_resource :only => [:browse,:getLikesSize,:getDislikesSize,:index]
      respond_to :json
      #for the logged in user
      def showGalleries
        @galleries = Gallery.uniq.joins(:arts).where('arts.uploader = ?', current_user.id.to_s)
      end

      def upvote
        @gallery = Gallery.find(params[:id])
        @gallery.liked_by current_user
      end

      def downvote
        @gallery = Gallery.find(params[:id])
        @gallery.downvote_from current_user
      end

      def browse
        @number = @gallery.id
        unless @gallery.show
          render  {}
        end
      end

=begin
      def getLikesSize
        @gallery = Gallery.find(params[:id])
        render json: @gallery.get_likes.size
      end

      def getDislikesSize
        @gallery = Gallery.find(params[:id])
        render json: @gallery.get_dislikes.size
      end
=end
      # GET /galleries
      # GET /galleries.json
      def index
        if params[:tag]
          @galleries = Gallery.tagged_with(params[:tag]).order(:id)
        else
          @galleries = Gallery.all.order(:id)
        end
      end

      # GET /galleries/1
      # GET /galleries/1.json
      def show
        @arts = Array.new()
        @gallery.art_ids.each do |aid|
          @arts << Art.find(aid)
        end

      end

      # GET /galleries/new
      def new
        @arts = Art.where(uploader: current_user.id)

      end

      # GET /galleries/1/edit
      def edit
      end

      # POST /galleries
      # POST /galleries.json
      def create
        @gallery = Gallery.new(gallery_params)
        @gallery.thumbUrl = @gallery.arts.first.image.thumb('400x200').url
        respond_to do |format|
          if @gallery.save
            format.html { redirect_to @gallery, notice: 'Gallery was successfully created.' }
            format.json { render :show, status: :created, location: @gallery }
          else
            format.html { render :new }
            format.json { render json: @gallery.errors, status: :unprocessable_entity }
          end
        end
      end

      # PATCH/PUT /galleries/1
      # PATCH/PUT /galleries/1.json
      def update
        respond_to do |format|
          if @gallery.update(gallery_params)
            format.html { redirect_to @gallery, notice: 'Gallery was successfully updated.' }
            format.json { render :show, status: :ok, location: @gallery }
          else
            format.html { render :edit }
            format.json { render json: @gallery.errors, status: :unprocessable_entity }
          end
        end
      end

      # DELETE /galleries/1
      # DELETE /galleries/1.json
      def destroy
        @gallery.destroy
        respond_to do |format|
          format.html { redirect_to :back, notice: 'Gallery was successfully destroyed.' }
          format.json { head :no_content }
        end
      end

      private

      # Use callbacks to share common setup or constraints between actions.
      def set_gallery
        @gallery = Gallery.find(params[:id])
      end

      # Never trust parameters from the scary internet, only allow the white list through.
      def gallery_params
        params.require(:gallery).permit(:tag_list,:utext,:dtext,:show,:thumbUrl,{:art_ids => []})
      end
    end
  end
end
