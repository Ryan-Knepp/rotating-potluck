class Person < ApplicationRecord
  belongs_to :household, optional: true
  belongs_to :organization
  has_and_belongs_to_many :potlucks

  def initialize(args)
    super(args)
    @pco_household = nil
  end

  def update_from_pco(pco_person_id, pco_results, included_mapping)
    self.pco_person = pco_person_id
    self.name = pco_results["attributes"]["name"]
    self.avatar_url = pco_results["attributes"]["avatar"]
    update_from_included(pco_results, included_mapping)
  end

  def pco_household
    @pco_household
  end

  private

  def update_from_included(pco_results, included_mapping)
    rel_map = {
      "addresses" => lambda { |rel| set_address_from_relationship(rel, included_mapping["address"]) },
      "emails" => lambda { |rel| set_email_from_relationship(rel, included_mapping["email"]) },
      "households" => lambda { |rel| set_pco_household_from_relationship(rel, included_mapping["household"]) },
      "phone_numbers" => lambda { |rel| set_phone_from_relationship(rel, included_mapping["phonenumber"]) }
    }
    pco_results["relationships"].each do |k, v|
      k = k.downcase
      if rel_map.keys.include?(k)
        rel_map[k].call(v)
      end
    end
  end

  def set_address_from_relationship(rel, mapping)
    if rel["data"].count == 0
      return
    end
    rel_id = rel["data"][0]["id"]
    self.address = mapping[rel_id]
  end

  def set_email_from_relationship(rel, mapping)
    if rel["data"].count == 0
      return
    end
    rel_id = rel["data"][0]["id"]
    attributes = mapping[rel_id]
    self.email = attributes["address"]
  end

  def set_pco_household_from_relationship(rel, mapping)
    if rel["data"].count == 0
      return
    end
    @pco_household = rel["data"][0]["id"]
  end

  def set_phone_from_relationship(rel, mapping)
    rel["data"].each do |phone|
      data = mapping[phone["id"]]
      if data["primary"]
        self.phone_number = data["number"]
        return
      end
    end
  end
end
