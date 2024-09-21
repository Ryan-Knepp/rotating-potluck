class Api::V1::AttendeesController < ApplicationController
  # GET /attendees
  def index
    @households = current_org.households.where(signed_up: true)
    household_ids = @households.pluck(:id)
    @people = current_org.people.where(signed_up: true).where(is_child: false).where("household_id NOT IN (?) OR household_id IS NULL", household_ids)
    render json: { households: @households, people: @people }
  end
end
