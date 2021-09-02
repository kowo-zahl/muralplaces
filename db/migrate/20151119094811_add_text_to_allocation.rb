class AddTextToAllocation < ActiveRecord::Migration[6.1]
  def change
    add_column :allocations, :text, :string
  end
end
