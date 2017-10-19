class AddShowToGallery < ActiveRecord::Migration
  def change
    add_column :galleries, :show, :boolean
  end
end
