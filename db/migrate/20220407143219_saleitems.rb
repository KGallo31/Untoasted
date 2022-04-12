class Saleitems < ActiveRecord::Migration[6.1]
  def change
    create_table :saleitems do |t| 
      t.references :sale, null: false, foreign_key: true
      t.references :item, null: false, foreign_key: true
    end
  end
end
