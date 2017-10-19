class CommentMail
  include ActiveModel::Model
  attr_accessor :comment_id, :user_id,:report_user_id,:message
end