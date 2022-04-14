# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2022_04_14_151435) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "credit_cards", force: :cascade do |t|
    t.string "digits"
    t.integer "month"
    t.integer "year"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "employees", force: :cascade do |t|
    t.string "name"
    t.string "password_digest"
    t.datetime "clock_out"
    t.datetime "clock_in"
    t.float "total_hours"
    t.string "username"
    t.boolean "clocked_in", default: false
  end

  create_table "items", force: :cascade do |t|
    t.string "name"
    t.float "price"
    t.string "image_url"
    t.integer "quantity"
  end

  create_table "saleitems", force: :cascade do |t|
    t.bigint "sale_id", null: false
    t.bigint "item_id", null: false
    t.index ["item_id"], name: "index_saleitems_on_item_id"
    t.index ["sale_id"], name: "index_saleitems_on_sale_id"
  end

  create_table "sales", force: :cascade do |t|
    t.float "total_price"
    t.bigint "employee_id", null: false
    t.index ["employee_id"], name: "index_sales_on_employee_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "saleitems", "items"
  add_foreign_key "saleitems", "sales"
  add_foreign_key "sales", "employees"
end
