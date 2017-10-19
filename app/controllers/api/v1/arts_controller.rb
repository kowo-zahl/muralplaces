module Api
  module V1
    class ArtsController < ApplicationController
      before_action :set_art, only: [:show,:getThumbUrl]
      load_and_authorize_resource
      respond_to :json
      skip_authorize_resource :only => [:getThumbUrl,:getUserName,:getUserEmail]

      
      def getUserŃame
		@usr = User.find_by username: params[:username].to_s
		render "getUserName"
      end
      def getUserEmail
		@usr = User.find_by email: params[:email].to_s
		render "getUserEmail"
      end
      
      def getThumbUrl
         @art = Art.find(params[:id])
        render "getThumbUrl"
      end

      # GET /arts.json
      def index
        @arts = Art.where(uploader: current_user.id)
      end

      def show

      end

      private

      # Use callbacks to share common setup or constraints between actions.
      def set_art
        @art = Art.find(params[:id])
      end
    end
  end
end
