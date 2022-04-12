class AddClockedinColumnEmployee < ActiveRecord::Migration[6.1]
  def change
    add_column :employees, :clocked_in, :boolean, :default => false
  end
end
