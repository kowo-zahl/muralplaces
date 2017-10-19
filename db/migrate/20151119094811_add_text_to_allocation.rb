class AddTextToAllocation < ActiveRecord::Migration
  def change
    add_column :allocations, :text, :string
  end
end
