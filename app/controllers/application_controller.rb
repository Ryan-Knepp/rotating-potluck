require "oauth2"

class ApplicationController < ActionController::API
  OAUTH_APP_ID = ENV.fetch("PCO_APP_ID").freeze
  OAUTH_SECRET = ENV.fetch("PCO_SECRET").freeze
  DOMAIN = ENV.fetch("DOMAIN", "http://localhost:3000").freeze
  API_URL = "https://api.planningcenteronline.com"
  TOKEN_EXPIRATION_PADDING = 300

  before_action :authenticated?
  before_action :has_org?

  def current_user
    Person.find_by(pco_person: session[:user_id])
  end

  def current_org
    Organization.find(session[:org_id])
  end

  def authenticated?
    if !!current_user
      return true
    end
    render json: { error: "Not authenticated" }, status: :unauthorized
  end

  def has_org?
    if !!current_org
      return true
    end
    render json: { error: "No organization" }, status: :unauthorized
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

  private
    def client
      OAuth2::Client.new(OAUTH_APP_ID, OAUTH_SECRET, site: API_URL)
    end
end
