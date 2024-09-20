class AddOrganizationToPotluckIterations < ActiveRecord::Migration[7.2]
  def change
    add_reference :potluck_iterations, :organization, null: false, foreign_key: true
  end
end
