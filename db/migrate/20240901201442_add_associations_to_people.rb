class AddAssociationsToPeople < ActiveRecord::Migration[7.2]
  def change
    add_reference :people, :household, null: true, foreign_key: true
    add_reference :people, :organization, null: false, foreign_key: true
  end
end
