class AddDtextToGallery < ActiveRecord::Migration[6.1]
  def change
    add_column :galleries, :dtext, :string
  end
end
