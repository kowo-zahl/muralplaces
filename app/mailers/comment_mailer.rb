class CommentMailer < ApplicationMailer
  def send_email(subject,btext)
   sendmail = mail(to: 'abuse@kalter-tee.de', subject: subject, from: 'streetart@kalter-tee.de' ) do |format|
      format.text do
        render :text => btext
      end
    end
    sendmail.deliver
  end
end