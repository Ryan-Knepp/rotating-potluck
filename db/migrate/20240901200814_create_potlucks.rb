class CreatePotlucks < ActiveRecord::Migration[7.2]
  def change
    create_table :potlucks do |t|
      t.boolean :kids_allowed, default: true

      t.timestamps
    end
  end
end
