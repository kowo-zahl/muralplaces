class AddOrientationToArts < ActiveRecord::Migration
  def change
    add_column :arts, :orientation, :integer
  end
end
