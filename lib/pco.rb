require "pco_api"
require "oauth2"

class PCO_Api
  # OAUTH_APP_ID = ENV.fetch("PCO_APP_ID").freeze
  # OAUTH_SECRET = ENV.fetch("PCO_SECRET").freeze
  # DOMAIN = ENV.fetch("DOMAIN", "http://localhost:3000").freeze
  API_URL = "https://api.planningcenteronline.com"
  TOKEN_EXPIRATION_PADDING = 300
  PERSONAL_TOKEN = ENV.fetch("PCO_PERSONAL_TOKEN").freeze
  PERSONAL_SECRET = ENV.fetch("PCO_PERSONAL_SECRET").freeze

  def initialize(token = nil)
    @token = token
  end

  def api
    if @token
      return PCO::API.new(oauth_access_token: @token.token, url: API_URL)
    end
    PCO::API.new(basic_auth_token: PERSONAL_TOKEN, basic_auth_secret: PERSONAL_SECRET)
  end

  def me
    api.people.v2.me.get(include: "addresses,households,emails,phone_numbers,organization")
  end

  def search_people(name, page)
    offset = (page - 1) * 25
    api.people.v2.people.get("where[search_name]": name, "where[status]": "active", "where[child]": false, order: "last_name", include: "addresses,households,emails,phone_numbers", offset: offset)
  end

  def get_person(id)
    api.people.v2.people[id].get(include: "addresses,households,emails,phone_numbers,organization")
  end

  def get_people_by_ids(ids)
    api.people.v2.people.get("where[id]": ids.join(","), include: "addresses,households,emails,phone_numbers,organization")
  end

  def get_household(id)
    api.people.v2.households[id].get
  end

  def get_household_and_people(id)
    api.people.v2.households[id].people.get(include: "addresses,households,emails,phone_numbers,organization")
  end

  def self.included_to_mapping(included)
    mapping = {}
    included.each do |i|
      type = i["type"].downcase
      if mapping[type].nil?
        mapping[type] = {}
      end
      mapping[type][i["id"]] = i["attributes"]
    end
    mapping
  end
end
