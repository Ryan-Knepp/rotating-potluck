class Api::V1::OrganizationsController < ApplicationController
  before_action :set_organization, only: %i[ show update destroy ]

  # GET /organizations/1
  def show
    render json: @organization
  end

  # POST /organizations
  def create
    @organization = Organization.new(organization_params)

    if @organization.save
      render json: @organization, status: :created
    else
      render json: @organization.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /organizations/1
  def update
    if @organization.update(organization_params)
      render json: @organization
    else
      render json: @organization.errors, status: :unprocessable_entity
    end
  end

  # DELETE /organizations/1
  def destroy
    @organization.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_organization
      @organization = current_org
    end

    # Only allow a list of trusted parameters through.
    def organization_params
      params.require(:organization).permit(:pco_organization, :name, :avatar_url)
    end
end
