class AddTitleToGallery < ActiveRecord::Migration
  def change
    add_column :galleries, :title, :string
  end
end
