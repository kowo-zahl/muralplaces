class CreateGalleries < ActiveRecord::Migration[6.1]
  def change
    create_table :galleries do |t|
     t.string :thumbUrl

      t.timestamps null: false
    end
  end
end
