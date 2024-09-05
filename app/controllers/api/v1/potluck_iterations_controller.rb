class Api::V1::PotluckIterationsController < ApplicationController
  before_action :set_potluck_iteration, only: %i[ show update destroy ]

  # GET /potluck_iterations
  def index
    @potluck_iterations = PotluckIteration.all

    render json: @potluck_iterations
  end

  # GET /potluck_iterations/1
  def show
    render json: @potluck_iteration
  end

  # POST /potluck_iterations
  def create
    @potluck_iteration = PotluckIteration.new(potluck_iteration_params)

    if @potluck_iteration.save
      render json: @potluck_iteration, status: :created, location: @potluck_iteration
    else
      render json: @potluck_iteration.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /potluck_iterations/1
  def update
    if @potluck_iteration.update(potluck_iteration_params)
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
      params.require(:potluck_iteration).permit(:date_range_type, :date_range)
    end
end
