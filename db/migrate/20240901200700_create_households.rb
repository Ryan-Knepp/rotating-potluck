class CreateHouseholds < ActiveRecord::Migration[7.2]
  def change
    create_table :households do |t|
      t.string :pco_household
      t.string :name
      t.text :avatar_url
      t.integer :times_hosted, default: 0
      t.integer :last_hosted_iteration, default: 0
      t.boolean :willing_to_host, default: false
      t.boolean :signed_up, default: false

      t.timestamps
    end
  end
end
