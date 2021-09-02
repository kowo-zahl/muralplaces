class CreateAllocations < ActiveRecord::Migration[6.1]
  def change
    create_table :allocations do |t|
      t.integer :gallery_id
      t.integer :art_id
    

      t.timestamps null: false
    end
  end
end
