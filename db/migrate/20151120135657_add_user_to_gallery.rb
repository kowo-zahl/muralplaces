class AddUserToGallery < ActiveRecord::Migration
  def change
    add_column :galleries, :user, :integer
  end
end
