class CreatePrivacies < ActiveRecord::Migration[6.1]
  def change
    create_table :privacies do |t|
      t.string :text
      t.integer :position

      t.timestamps null: false
    end
  end
end
