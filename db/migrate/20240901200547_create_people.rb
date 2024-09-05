class CreatePeople < ActiveRecord::Migration[7.2]
  def change
    create_table :people do |t|
      t.string :pco_person
      t.string :name
      t.text :avatar_url
      t.json :address
      t.string :email
      t.string :phone_number
      t.integer :times_hosted, default: 0
      t.integer :last_hosted_iteration, default: 0
      t.boolean :willing_to_host, default: false
      t.boolean :signed_up, default: true
      t.boolean :is_organizer, default: false
      t.boolean :is_household_primary_contact, default: false

      t.timestamps
    end
  end
end
