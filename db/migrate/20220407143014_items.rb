class Items < ActiveRecord::Migration[6.1]
  def change
    create_table :items do |t| 
      t.string :name
      t.float :price
      t.string :image_url
      t.integer :quantity
    end
  end
end
