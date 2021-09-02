class CreateImpressums < ActiveRecord::Migration[6.1]
  def change
    create_table :impressums do |t|
      t.string :text
      t.integer :position

      t.timestamps null: false
    end
  end
end
