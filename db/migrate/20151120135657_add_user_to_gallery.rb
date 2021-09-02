class AddUserToGallery < ActiveRecord::Migration[6.1]
  def change
    add_column :galleries, :user, :integer
  end
end
