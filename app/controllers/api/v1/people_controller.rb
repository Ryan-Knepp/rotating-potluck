require_relative "../../../../lib/pco"

class Api::V1::PeopleController < ApplicationController
  before_action :set_person, only: %i[ show update destroy ]

  # GET /people
  def index
    @people = current_org.people.all

    render json: @people
  end

  # GET /people/1
  def show
    render json: @person
  end

  # POST /people
  def create
    pco_household = params[:pco_household]
    @person = Person.new(person_params)
    @person.organization = current_org

    if @person.save
      if pco_household
        household = Household.find_or_initialize_by(pco_household: pco_household)
        if household.new_record?
          result = PCO_Api.new(token).get_household(pco_household)
          household.name = result["data"]["attributes"]["name"]
          household.avatar_url = result["data"]["attributes"]["avatar"]
          household.organization = current_org
          household.save
        end
        if !household.errors.any?
          @person.update(household: household)
        end
      end
      render json: @person, status: :created
    else
      render json: @person.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /people/1
  def update
    if @person.update(person_params)
      render json: @person
    else
      render json: @person.errors, status: :unprocessable_entity
    end
  end

  # DELETE /people/1
  def destroy
    @person.destroy!
  end

  # GET /people/search
  def search
    # search for people via the planning center api
    pco = PCO_Api.new(token)
    result = pco.search_people(search_params[:name], search_params[:page].to_i)
    total = result["meta"]["total_count"]
    included_mapping = PCO_Api.included_to_mapping(result["included"])
    people = result["data"].map do |data|
      pco_person = data["id"]
      p = Person.find_or_initialize_by(pco_person: pco_person)
      p.update_from_pco(pco_person, data, included_mapping)
      if p.persisted?
        p.save()
      end
      p
    end

    render json: { people: people, total: total }
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_person
      if person_params[:pco_person]
        @person = current_org.people.find_by(pco_person: person_params[:pco_person])
      else
        @person = current_org.people.find(params[:id])
      end
    end

    # Only allow a list of trusted parameters through.
    def person_params
      params.require(:person).permit(:pco_person, :name, :avatar_url, :email, :phone_number, :times_hosted, :last_hosted_iteration, :willing_to_host, :signed_up, :is_organizer, :is_household_primary_contact, :is_child, address: {})
    end

    def search_params
      params.permit(:name, :page).with_defaults(page: 1)
    end
end
