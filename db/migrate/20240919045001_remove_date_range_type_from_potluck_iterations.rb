class RemoveDateRangeTypeFromPotluckIterations < ActiveRecord::Migration[7.2]
  def change
    remove_column :potluck_iterations, :date_range_type, :string
  end
end
