class Organization < ApplicationRecord
  has_many :people
  has_many :households
  has_many :potluck_iterations
end
