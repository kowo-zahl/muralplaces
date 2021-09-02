class AddUtextToGallery < ActiveRecord::Migration[6.1]
  def change
    add_column :galleries, :utext, :string
  end
end
