class AddGeoToArts < ActiveRecord::Migration[6.1]
  def change
	add_column :arts, :lat, :decimal, {:precision=>17, :scale=>15}
	add_column :arts, :lng, :decimal, {:precision=>17, :scale=>15}
  end
end
