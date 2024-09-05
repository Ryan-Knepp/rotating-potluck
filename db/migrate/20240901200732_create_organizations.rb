class CreateOrganizations < ActiveRecord::Migration[7.2]
  def change
    create_table :organizations do |t|
      t.string :pco_organization
      t.string :name
      t.text :avatar_url

      t.timestamps
    end
  end
end
