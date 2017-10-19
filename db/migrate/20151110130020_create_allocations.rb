class CreateAllocations < ActiveRecord::Migration
  def change
    create_table :allocations do |t|
      t.integer :gallery_id
      t.integer :art_id
      t.datetime :created_at

      t.timestamps null: false
    end
  end
end
