require "pco_api"

class AuthController < ApplicationController
  skip_before_action :authenticated?, only: [ :login ]


  def login
    api = get_pco_api
    result = api.people.v2.me.get(include: "addresses,households,emails,phone_numbers,organization")
    data = result["data"]
    included = result["included"]
    pco_id = data["id"]
    me = Person.find_or_initialize_by(pco_person: pco_id)
    if me.new_record?
      me.name = data["attributes"]["name"]
      me.avatar_url = data["attributes"]["avatar"]

      org_data = included.find { |i| i["type"] == "Organization" }
      org = Organization.find_or_initialize_by(pco_organization: org_data["id"])
      if org.new_record?
        org.name = org_data["attributes"]["name"]
        org.avatar_url = org_data["attributes"]["avatar_url"]
        org.save()
      end
      me.organization = org

      logger.info "Checking for household"
      household_data = included.find { |i| i["type"] == "Household" }
      logger.info "Found #{household_data}"
      if household_data
        household = Household.find_or_initialize_by(pco_household: household_data["id"])
        if household.new_record?
          logger.info "It's a new household"
          household.name = household_data["attributes"]["name"]
          household.avatar_url = household_data["attributes"]["avatar"]
          household.organization = org
          household.save()
        end
        me.household = household
      end

      address_data = included.find { |i| i["type"] == "Address" }
      if address_data
        me.address = address_data["attributes"]
      end

      email_data = included.find { |i| i["type"] == "Email" }
      if email_data
        me.email = email_data["attributes"]["address"]
      end

      phone_number_data = included.find { |i| i["type"] == "PhoneNumber" }
      if phone_number_data
        me.phone_number = phone_number_data["attributes"]["number"]
      end

      me.save()
    end
    session[:user_id] = me.pco_person
  end

  def logout
    session[:user_id] = nil
  end

  private
    def get_pco_api
      PCO::API.new(basic_auth_token: ENV["PCO_PERSONAL_TOKEN"], basic_auth_secret: ENV["PCO_PERSONAL_SECRET"])
    end
end
