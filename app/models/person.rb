class Person < ApplicationRecord
  belongs_to :household, optional: true
  belongs_to :organization
  has_and_belongs_to_many :potlucks
end
