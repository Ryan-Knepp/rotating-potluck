class Api::V1::PotluckIterationsController < ApplicationController
  before_action :set_potluck_iteration, only: %i[ show update destroy ]

  # GET /potluck_iterations
  def index
    @potluck_iterations = PotluckIteration.all

    render json: @potluck_iterations, include: [ potlucks: { include: [ :host_person, :people, host_household: { include: [ :people ] },  households: { include: [ :people ] } ] } ]
  end

  # GET /potluck_iterations/1
  def show
    render json: @potluck_iteration, include: [ potlucks: { include: [ :host_person, :people, host_household: { include: [ :people ] },  households: { include: [ :people ] } ] } ]
  end

  # POST /potluck_iterations
  def create
    date_range = dates_to_range(params[:date_from], params[:date_to])
    @potluck_iteration = PotluckIteration.find_or_initialize_by(date_range: date_range, organization: current_org)

    if @potluck_iteration.save
      # create potlucks if passed in
      if params.has_key?(:potlucks)
        potlucks = params[:potlucks]
        potlucks.each do |p|
          if !p[:host_household_id].nil? || !p[:host_person_id].nil?
            potluck = @potluck_iteration.potlucks.new(organization: current_org, host_household_id: p[:host_household_id], host_person_id: p[:host_person_id])
            households = []
            people = []
            p[:attendees].each do |a|
              if a[:household_id]
                households.append(a[:household_id])
              end
              if a[:person_id]
                people.append(a[:person_id])
              end
            end
            potluck.household_ids=households
            potluck.person_ids=people
            potluck.save
          end
        end
      end

      render json: @potluck_iteration, status: :created
    else
      render json: @potluck_iteration.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /potluck_iterations/1
  def update
    if @potluck_iteration.update(date_range: dates_to_range(params[:date_from], params[:date_to]))
      render json: @potluck_iteration
    else
      render json: @potluck_iteration.errors, status: :unprocessable_entity
    end
  end

  # DELETE /potluck_iterations/1
  def destroy
    @potluck_iteration.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_potluck_iteration
      @potluck_iteration = PotluckIteration.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def potluck_iteration_params
      params.require(:potluck_iteration).permit(:date_from, :date_to)
    end

    def dates_to_range(from, to)
      Date.parse(from)..Date.parse(to)
    end
end
