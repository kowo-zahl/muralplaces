class AddThumbArtToGallerie < ActiveRecord::Migration
  def change
    add_column :galleries, :thumbArt, :string
  end
end
