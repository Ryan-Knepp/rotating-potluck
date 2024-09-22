class Api::V1::PotlucksController < ApplicationController
  before_action :set_potluck, only: %i[ show update destroy ]

  # GET /potlucks
  def index
    @potlucks = current_org.potlucks.all

    render json: @potlucks, include: [ :host_household, :host_person, :households, :people ]
  end

  # GET /potlucks/1
  def show
    render json: @potluck, include: [ :host_household, :host_person, :people ]
  end

  # POST /potlucks
  def create
    @potluck = Potluck.new(potluck_params)


    if @potluck.save
      render json: @potluck, status: :created
    else
      render json: @potluck.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /potlucks/1
  def update
    if @potluck.update(potluck_params)
      render json: @potluck
    else
      render json: @potluck.errors, status: :unprocessable_entity
    end
  end

  # DELETE /potlucks/1
  def destroy
    @potluck.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_potluck
      @potluck = current_org.potlucks.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def potluck_params
      params.require(:potluck).permit(:kids_allowed, :host_person_id, :host_household_id, :potluck_iteration_id)
    end
end
