class AllocationsController < ApplicationController
  before_action :set_art, only: [:show, :edit, :update, :destroy]
  load_and_authorize_resource
  
  # PATCH/PUT /galleries/1
  # PATCH/PUT /galleries/1.json
  def update
    @allocation.update(allocation_params)
    redirect_to Gallery.find(@allocation.gallery_id)
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
