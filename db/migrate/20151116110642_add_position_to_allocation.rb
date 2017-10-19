class AddPositionToAllocation < ActiveRecord::Migration
  def change
    add_column :allocations, :position, :integer
  end
end
