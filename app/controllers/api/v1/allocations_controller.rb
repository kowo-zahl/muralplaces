module Api
  module V1
    class AllocationsController < ApplicationController
      before_action :set_art, only: [:show, :edit, :update, :destroy]
      load_and_authorize_resource
      respond_to :json
      # GET /arts.json
      def index
        @allocations = Allocations.all
      end

      def show
      end

      # PATCH/PUT /galleries/1
      # PATCH/PUT /galleries/1.json
      def update
        respond_to do |format|
          if @allocation.update(allocation_params)

            else
            format.json { render json: @allocation.errors, status: :unprocessable_entity }
          end
        end
      end
      private

      # Use callbacks to share common setup or constraints between actions.
      def set_art
        @allocation = Allocation.find(params[:id])
      end

      # Never trust parameters from the scary internet, only allow the white list through.
      def allocation_params
        params.require(:allocation).permit(:position,:text)
      end
    end
  end
end