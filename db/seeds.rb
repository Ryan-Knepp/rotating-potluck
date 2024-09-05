# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

org = Organization.find_or_create_by!(name: "My Church", pco_organization: "12345")
household = Household.find_or_create_by!(name: "My Household", pco_household: "123", organization: org)
person1 = Person.find_or_create_by!(name: "Person 1", pco_person: "123", organization: org, household: household)

iteration1 = PotluckIteration.find_or_create_by!(date_range_type: "seasonal", date_range: Date.new(2014, 6, 1)..Date.new(2014, 8, 30))
household.potlucks << Potluck.find_or_create_by!(potluck_iteration: iteration1, host_household_id: household.id)
iteration2 = PotluckIteration.find_or_create_by!(date_range_type: "seasonal", date_range: Date.new(2014, 9, 1)..Date.new(2014, 11, 30))
household.potlucks << Potluck.find_or_create_by!(potluck_iteration: iteration2, host_household_id: household.id)
household.save()
