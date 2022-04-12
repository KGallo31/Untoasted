class Sales < ActiveRecord::Migration[6.1]
  def change
    create_table :sales do |t| 
      t.float :total_price
      t.references :employee, null: false, foreign_key: true
    end
  end
end
