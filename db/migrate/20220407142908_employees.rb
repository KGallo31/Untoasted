class Employees < ActiveRecord::Migration[6.1]
  def change
    create_table :employees do |t|
      t.string :name
      t.string :password_digest
      t.timestamp :clock_out
      t.timestamp :clock_in
      t.float :total_hours
      t.string :username
    end
  end
end
