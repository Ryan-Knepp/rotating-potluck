require_relative "../../lib/pco"
require "oauth2"

class OauthController < ApplicationController
  OAUTH_APP_ID = ENV.fetch("PCO_APP_ID").freeze
  OAUTH_SECRET = ENV.fetch("PCO_SECRET").freeze
  DOMAIN = ENV.fetch("DOMAIN", "http://localhost:3000").freeze
  API_URL = "https://api.planningcenteronline.com"
  TOKEN_EXPIRATION_PADDING = 300

  skip_before_action :authenticated?, only: [ :login, :complete ]
  skip_before_action :has_org?, only: [ :login, :complete, :logout ]

  def login_url
    client.auth_code.authorize_url(
      scope: "people",
      redirect_uri: "#{DOMAIN}/auth/complete"
    )
  end

  def login
    url = login_url
    redirect_to(url, allow_other_host: true)
  end

  def complete
    token = client.auth_code.get_token(
      params[:code],
      redirect_uri: "#{DOMAIN}/auth/complete"
    )
    # store the auth token and refresh token info in our session
    session[:token] = token.to_hash
    user = get_user_data
    session[:user_id] = user.pco_person
    session[:org_id] = user.organization_id
    redirect_back_or_to("/")
  end


  def logout
    api.oauth.revoke.post(
      token: token.token,
      client_id: OAUTH_APP_ID,
      client_secret: OAUTH_SECRET
    )
    session.clear
    redirect_to "/"
  end

  private
    def client
      OAuth2::Client.new(OAUTH_APP_ID, OAUTH_SECRET, site: API_URL)
    end

    def token
      return if session[:token].nil?
      token = OAuth2::AccessToken.from_hash(client, session[:token].dup)
      if token.expires? && (token.expires_at < Time.now.to_i + TOKEN_EXPIRATION_PADDING) && token.refresh_token
        token = token.refresh!
        session[:token] = token.to_hash
      end
      token
    rescue OAuth2::Error
      session[:token] = nil
    end

    def get_user_data
      pco = PCO_Api.new(token)
      result = pco.me
      data = result["data"]
      included = result["included"]
      me = Person.find_or_initialize_by(pco_person: data["id"])
      if me.new_record?
        me.name = data["attributes"]["name"]
        me.avatar_url = data["attributes"]["avatar"]
        me.signed_up = true

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
      me
    end
end
