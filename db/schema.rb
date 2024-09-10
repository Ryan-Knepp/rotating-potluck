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

ActiveRecord::Schema[7.2].define(version: 2024_09_01_203122) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "households", force: :cascade do |t|
    t.string "pco_household"
    t.string "name"
    t.text "avatar_url"
    t.integer "times_hosted", default: 0
    t.integer "last_hosted_iteration", default: 0
    t.boolean "willing_to_host", default: false
    t.boolean "signed_up", default: true
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "organization_id", null: false
    t.index ["organization_id"], name: "index_households_on_organization_id"
  end

  create_table "households_potlucks", id: false, force: :cascade do |t|
    t.bigint "household_id", null: false
    t.bigint "potluck_id", null: false
  end

  create_table "organizations", force: :cascade do |t|
    t.string "pco_organization"
    t.string "name"
    t.text "avatar_url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "people", force: :cascade do |t|
    t.string "pco_person"
    t.string "name"
    t.text "avatar_url"
    t.json "address"
    t.string "email"
    t.string "phone_number"
    t.integer "times_hosted", default: 0
    t.integer "last_hosted_iteration", default: 0
    t.boolean "willing_to_host", default: false
    t.boolean "signed_up", default: false
    t.boolean "is_organizer", default: false
    t.boolean "is_household_primary_contact", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "household_id"
    t.bigint "organization_id", null: false
    t.index ["household_id"], name: "index_people_on_household_id"
    t.index ["organization_id"], name: "index_people_on_organization_id"
  end

  create_table "people_potlucks", id: false, force: :cascade do |t|
    t.bigint "person_id", null: false
    t.bigint "potluck_id", null: false
  end

  create_table "potluck_iterations", force: :cascade do |t|
    t.string "date_range_type"
    t.daterange "date_range"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "potlucks", force: :cascade do |t|
    t.boolean "kids_allowed", default: true
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "potluck_iteration_id", null: false
    t.bigint "host_person_id"
    t.bigint "host_household_id"
    t.index ["host_household_id"], name: "index_potlucks_on_host_household_id"
    t.index ["host_person_id"], name: "index_potlucks_on_host_person_id"
    t.index ["potluck_iteration_id"], name: "index_potlucks_on_potluck_iteration_id"
  end

  add_foreign_key "households", "organizations"
  add_foreign_key "people", "households"
  add_foreign_key "people", "organizations"
  add_foreign_key "potlucks", "households", column: "host_household_id"
  add_foreign_key "potlucks", "people", column: "host_person_id"
  add_foreign_key "potlucks", "potluck_iterations"
end
