class CreateJoinTableForPotlucks < ActiveRecord::Migration[7.2]
  def change
    create_join_table :people, :potlucks
    create_join_table :households, :potlucks
  end
end
