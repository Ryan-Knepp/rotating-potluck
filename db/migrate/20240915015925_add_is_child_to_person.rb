class AddIsChildToPerson < ActiveRecord::Migration[7.2]
  def change
    add_column :people, :is_child, :boolean, default: false
  end
end
