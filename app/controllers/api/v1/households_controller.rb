require_relative "../../../../lib/pco"

class Api::V1::HouseholdsController < ApplicationController
  before_action :set_household, only: %i[ show update destroy ]

  # GET /households
  def index
    @households = current_org.households.all

    render json: @households
  end

  # GET /households/1
  def show
    render json: @household
  end

  # POST /households
  def create
    if household_params[:pco_household].nil?
      return render json: { error: "Missing pco id" }, status: :unprocessable_entity
    end

    if params[:update_from_pco]
      upsert_from_pco(household_params)
    else
      @household = Household.new(household_params)
      @household.organization = current_org
      @household.save
    end

    if @household.errors.any?
      render json: @household.errors, status: :unprocessable_entity
    else
      render json: @household, status: :created
    end
  end

  # PATCH/PUT /households/1
  def update
    if params[:update_from_pco]
      puts "In update_from_pco"
      upsert_from_pco(household_params)
      if @household.errors.any?
        return render json: @household.errors, status: :unprocessable_entity
      end
      render json: @household
    elsif @household.update(household_params)
      render json: @household
    else
      render json: @household.errors, status: :unprocessable_entity
    end
  end

  # DELETE /households/1
  def destroy
    @household.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_household
      if params[:pco_household]
        @household = current_org.households.find_by(pco_household: params[:pco_household])
      else
        @household = current_org.households.find(params[:id])
      end
    end

    # Only allow a list of trusted parameters through.
    def household_params
      params.require(:household).permit(:pco_household, :name, :avatar_url, :times_hosted, :last_hosted_iteration, :willing_to_host, :signed_up)
    end

    def upsert_from_pco(upsert_params)
      pco_household = upsert_params[:pco_household]
      if pco_household.nil?
        pco_household = @household.pco_household
      end
      pco = PCO_Api.new(token)
      result = pco.get_household_and_people(pco_household)
      included_mapping = PCO_Api.included_to_mapping(result["included"])
      household_data = included_mapping["household"][pco_household]
      if @household.nil?
        @household = Household.find_or_initialize_by(pco_household: pco_household, organization: current_org)
      end
      @household.name = household_data["name"]
      @household.avatar_url = household_data["avatar"]
      if @household.new_record?
        @household.willing_to_host = true
      end
      @household.attributes = upsert_params

      if @household.save
        result["data"].each do |p|
          pco_person = p["id"]
          person = Person.find_or_initialize_by(pco_person: pco_person)
          person.update_from_pco(pco_person, p, included_mapping)
          person.household = @household
          person.organization = current_org
          person.save()
        end
      end
    end
end
