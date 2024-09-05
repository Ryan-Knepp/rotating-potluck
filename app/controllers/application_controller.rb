class ApplicationController < ActionController::API
  before_action :authenticated?

  def current_user
    Person.find_by(pco_person: session[:user_id])
  end

  def authenticated?
    if !!current_user
      return true
    end
    render json: { error: "Not authenticated" }, status: :unauthorized
  end
end
