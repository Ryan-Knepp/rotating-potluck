class AddOrganizationToPotlucks < ActiveRecord::Migration[7.2]
  def change
    add_reference :potlucks, :organization, null: false, foreign_key: true
  end
end
