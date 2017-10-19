class AddUtextToGallery < ActiveRecord::Migration
  def change
    add_column :galleries, :utext, :string
  end
end
