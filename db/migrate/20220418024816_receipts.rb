class Receipts < ActiveRecord::Migration[6.1]
  def change
    create_table :receipts do |t| 
      t.float :total_price
      t.integer :last4
      t.string :card_type
      t.date :date_processed
    end
  end
end
