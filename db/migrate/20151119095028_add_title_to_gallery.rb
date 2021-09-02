class AddTitleToGallery < ActiveRecord::Migration[6.1]
  def change
    add_column :galleries, :title, :string
  end
end
