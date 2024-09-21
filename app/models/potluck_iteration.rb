class PotluckIteration < ApplicationRecord
  belongs_to :organization
  has_many :potlucks
end
