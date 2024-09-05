class AddAssociationsToPotluck < ActiveRecord::Migration[7.2]
  def change
    add_reference :potlucks, :potluck_iteration, null: false, foreign_key: true
    add_reference :potlucks, :host_person, null: true, foreign_key: { to_table: :people }
    add_reference :potlucks, :host_household, null: true, foreign_key: { to_table: :households }
  end
end
