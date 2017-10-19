class CommentsController < ApplicationController
  authorize_resource :class => false
  skip_authorize_resource :only => [:getComments]
  
=begin
  def getComments
    @gallery = Gallery.find(params[:id])
    @all_comments = @gallery.comment_threads
    render json: @all_comments
  end
  
  def  setComments
    @gallery = Gallery.find(params[:id])
    @comment = Comment.build_from( @gallery, @current_user.id, params[:ctext] )
    if @comment.save
      unless params[:parentid].nil?
        @comment.move_to_child_of(params[:parentid])
      end
        render :json => {}
    else
      render json: @comment.errors, status: :unprocessable_entity
    end
  end
=end

  def index
    if user_signed_in?
      @comments=Comment.where(user_id: current_user.id)
    else
      render root_url
    end
  end
  
=begin  
  def destroy
    @comment = Comment.find(params[:id])
    @comment.body = "Kommentar wurde gelöscht."
    @comment.save
    respond_to do |format|
      format.html { redirect_to root_url, notice: 'Comment was successfully destroyed.' }
      format.json { head :no_content }
    end
  end
=end
    # Never trust parameters from the scary internet, only allow the white list through.
  private 

  def comments_params
    params.require(:comments).permit(:artid,:parentid,:commentid,:ctext)
  end
end
