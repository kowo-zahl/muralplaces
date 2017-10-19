class AddDtextToGallery < ActiveRecord::Migration
  def change
    add_column :galleries, :dtext, :string
  end
end
