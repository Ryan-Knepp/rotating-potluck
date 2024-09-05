class AddAssociationsToHousehold < ActiveRecord::Migration[7.2]
  def change
    add_reference :households, :organization, null: false, foreign_key: true
  end
end
