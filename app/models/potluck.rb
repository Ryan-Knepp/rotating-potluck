class Potluck < ApplicationRecord
  belongs_to :potluck_iteration
  belongs_to :host_person, class_name: "Person", optional: true
  belongs_to :host_household, class_name: "Household", optional: true
  has_and_belongs_to_many :people
  has_and_belongs_to_many :households
end
