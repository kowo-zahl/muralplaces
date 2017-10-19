class StaticPagesController < ApplicationController

  def datenschutz
  end
  def impressum    
  end
  def nutzungsbedingungen  
  end
  
  def publishPicture
      @art = Art.find(params[:id])
      unless (@art.uploader.to_s == current_user.id.to_s) || (current_user.has_role? :admin)
        redirect_to :back, notice: "Ein Fehler ist aufgetreten."
        return
      end  
      @gallery = Gallery.new()
      @gallery.arts = [@art]
      @gallery.thumbUrl = @art.getThumbUrl
      @gallery.show = true    
  end
end
