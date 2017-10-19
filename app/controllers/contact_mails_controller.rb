class ContactMailsController < ApplicationController
  def new
    @contact_mail = ContactMail.new
  end

  def create
    @contact_mail = ContactMail.new(contact_mail_params)

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

    @contact_mail.request = request
    if @contact_mail.deliver
      flash[:notice] = 'Danke fuer Ihrer Nachricht, wir werden Sie bald kontaktieren!'
      redirect_to root_url
    else
      flash[:error] = 'Nachricht konnte nicht gesendet werden.'

      render :new
    end
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def contact_mail_params
    params.require(:contact_mail).permit(:name, :email,:file,:message,:captcha,:cap)
  end
end