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
    @potluck_iteration = PotluckIteration.new(date_range: dates_to_range(params[:date_from], params[:date_to]))

    if @potluck_iteration.save
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
