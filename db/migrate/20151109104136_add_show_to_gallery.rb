class AddShowToGallery < ActiveRecord::Migration[6.1]
  def change
    add_column :galleries, :show, :boolean
  end
end
