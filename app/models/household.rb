class Household < ApplicationRecord
  belongs_to :organization
  has_many :people
  has_and_belongs_to_many :potlucks

  def as_json(options = { include: :people })
    super(options)
  end
end
