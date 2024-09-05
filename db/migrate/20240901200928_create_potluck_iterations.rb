class CreatePotluckIterations < ActiveRecord::Migration[7.2]
  def change
    create_table :potluck_iterations do |t|
      t.string :date_range_type
      t.daterange :date_range

      t.timestamps
    end
  end
end
