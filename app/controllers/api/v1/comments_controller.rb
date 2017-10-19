module Api
  module V1
    class CommentsController < ApplicationController
      authorize_resource :class => false
      skip_authorize_resource :only => [:getRootComments,:getChildComments]
      respond_to :json
      
      def getRootComments
        @comments=Gallery.find(params[:id]).root_comments
      end
      
      def getChildComments
        
        @comments=Comment.find(params[:id]).children
      end
      
      def  setComments
        @gallery = Gallery.find(params[:id])
        @comment = Comment.build_from( @gallery, @current_user.id, params[:commentText] )
        if @comment.save
          unless params[:commentParentId].nil?
            @comment.move_to_child_of(params[:commentParentId])
          end
          
        end
        return @comment
      end

      def index
        if user_signed_in?
          @comments=Comment.where(user_id: current_user.id)
        else
         render :json => {}
        end
      end

      def destroy
        @comment = Comment.find(params[:id])
        @comment.body = "Kommentar wurde gelöscht."
        unless @comment.save
          render :json => {}
        end
      end

      # Never trust parameters from the scary internet, only allow the white list through.
      private

      def comments_params
        params.require(:comments).permit(:artid,:commentParentId,:commentid,:commentText)
      end
    end
  end
end
