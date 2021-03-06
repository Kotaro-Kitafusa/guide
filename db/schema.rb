# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_01_19_090447) do

  create_table "pilot_locations", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.bigint "pilot_id"
    t.decimal "latitude", precision: 10, scale: 8
    t.decimal "longitude", precision: 11, scale: 8
    t.string "prefecture"
    t.string "address_city"
    t.string "address_street"
    t.string "address"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["pilot_id"], name: "index_pilot_locations_on_pilot_id"
  end

  create_table "pilots", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "first_name", null: false
    t.string "last_name", null: false
    t.string "nickname"
    t.date "birthday"
    t.integer "status", default: 0, null: false
    t.decimal "lat", precision: 10, scale: 8
    t.decimal "lng", precision: 11, scale: 8
    t.index ["email"], name: "index_pilots_on_email", unique: true
    t.index ["reset_password_token"], name: "index_pilots_on_reset_password_token", unique: true
  end

  add_foreign_key "pilot_locations", "pilots"
end
