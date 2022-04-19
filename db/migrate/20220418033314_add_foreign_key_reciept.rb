class AddForeignKeyReciept < ActiveRecord::Migration[6.1]
  def change
    add_reference :receipts, :receiptitmes, index: true
  end
end
