class AddDragonflyToArts < ActiveRecord::Migration[6.1]
  def change
    add_column :arts, :image_uid,  :string
    add_column :arts, :image_name, :string 
  end
end
