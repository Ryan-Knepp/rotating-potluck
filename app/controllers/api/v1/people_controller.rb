require "pco_api"

class Api::V1::PeopleController < ApplicationController
  before_action :set_person, only: %i[ show update destroy ]

  # GET /people
  def index
    @people = Person.all

    render json: @people
  end

  # GET /people/1
  def show
    render json: @person
  end

  # POST /people
  def create
    @person = Person.new(person_params)

    if @person.save
      render json: @person, status: :created, location: @person
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
    api = get_pco_api
    # /people/v2/people?include=addresses,households,emails,phone_numbers&per_page=5
    result = api.people.v2.people.get(per_page: 5, "where[search_name]": search_params[:name], "where[status]": "active", "where[child]": false, ordering: "last_name", include: "addresses,households,emails,phone_numbers")
    # render json: result["data"]
    included_mapping = includes_to_mapping(result["included"])
    people = result["data"].map do |data|
      p = Person.new
      p.update_from_pco(data["id"], data, included_mapping)
      logger.info "Updated person"
      logger.info p
      p
    end

    render json: people, methods: [ :pco_household ]
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_person
      @person = Person.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def person_params
      params.require(:person).permit(:pco_person, :name, :avatar_url, :address, :email, :phone_number, :times_hosted, :last_hosted_iteration, :willing_to_host, :signed_up, :is_organizer, :is_household_primary_contact)
    end

    def search_params
      params.permit(:name)
    end

    def get_pco_api
      PCO::API.new(basic_auth_token: ENV["PCO_PERSONAL_TOKEN"], basic_auth_secret: ENV["PCO_PERSONAL_SECRET"])
    end

    def includes_to_mapping(includes)
      mapping = {}
      includes.each do |i|
        type = i["type"].downcase
        if mapping[type].nil?
          mapping[type] = {}
        end
        mapping[type][i["id"]] = i["attributes"]
      end
      mapping
    end
end
