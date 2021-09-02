class AddThumbArtToGallerie < ActiveRecord::Migration[6.1]
  def change
    add_column :galleries, :thumbArt, :string
  end
end
