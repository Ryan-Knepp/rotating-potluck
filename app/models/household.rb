class Household < ApplicationRecord
  belongs_to :organization
  has_many :people
  has_and_belongs_to_many :potlucks
end
