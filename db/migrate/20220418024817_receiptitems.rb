class Receiptitems < ActiveRecord::Migration[6.1]
  def change
    create_table :receiptitems do |t|
      t.references :receipt, null: false, foreign_key: true
      t.references :item, null: false, foreign_key: true
    end
  end
end
