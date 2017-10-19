class CommentMailsController < ApplicationController
  
  #If we get an email about a comment, we need some information
  def new
    @comment_mail = CommentMail.new()
    #the comment in question
    comment = Comment.find(params[:comment_id])
    @comment_mail.comment_id = comment.id
    #the user how wrote the comment
    @comment_mail.user_id = comment.user_id
    #the user how report the comment
    if signed_in?
      @comment_mail.report_user_id = current_user.id
    else
      #user_id 0 is for anonymous
      @comment_mail.report_user_id = 0
    end

  end

  def create

    #captcha must be correct
    #lil captcha hack
    if params[:captcha].nil?
      flash[:error] = 'Captcha nicht korrekt.'
      render :new
    return
    end
    cap = params[:cap][0].to_i
    captcha = params[:captcha].to_i
    unless captcha == cap
      flash[:error] = 'Captcha nicht korrekt.'
      render :new
    return
    end
    #lil captcha hack end

    subject = "Nutzer "+params["comment_mail"]["report_user_id"]+" meldet Kommentar "+params["comment_mail"]["comment_id"]

    btext= "Folgender Kommentar wurde gemeldet: "+Comment.find(params["comment_mail"]["comment_id"]).body+" \n"+"\n\n\n User_id: "+params["comment_mail"]["report_user_id"]

    puts CommentMailer.send_email(subject,btext)
    if CommentMailer.send_email(subject,btext)
      flash[:notice] = 'Danke fuer Ihrer Nachricht!'

      redirect_to :back
    else
      flash[:error] = 'Nachricht konnte nicht gesendet werden.'

      render :new
    end
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def comment_mail_params
    params.require(:comment_mail).permit(:comment_id, :user_id,:report_user_id,:message,:captcha,:cap)
  end
end