class AddImageIdsToArt < ActiveRecord::Migration
  def change
    add_column :arts, :image_normal_uid, :string
    add_column :arts, :image_thumbnail_uid, :string
    add_column :arts, :image_small_uid, :string
  end
end
