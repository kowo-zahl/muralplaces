class AddPositionToAllocation < ActiveRecord::Migration[6.1]
  def change
    add_column :allocations, :position, :integer
  end
end
