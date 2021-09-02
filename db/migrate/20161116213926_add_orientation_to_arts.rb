class AddOrientationToArts < ActiveRecord::Migration[6.1]
  def change
    add_column :arts, :orientation, :integer
  end
end
