class CreateArts < ActiveRecord::Migration[6.1]
  def change
   create_table :arts do |t|
      t.string :uploader
      t.string :name
      t.string :country
      t.string :city
      t.string :state

      t.timestamps null: false
    end
  end
end
