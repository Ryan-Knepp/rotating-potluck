require "test_helper"

class PotluckIterationsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @potluck_iteration = potluck_iterations(:one)
  end

  test "should get index" do
    get potluck_iterations_url, as: :json
    assert_response :success
  end

  test "should create potluck_iteration" do
    assert_difference("PotluckIteration.count") do
      post potluck_iterations_url, params: { potluck_iteration: { date_range: @potluck_iteration.date_range, date_range_type: @potluck_iteration.date_range_type } }, as: :json
    end

    assert_response :created
  end

  test "should show potluck_iteration" do
    get potluck_iteration_url(@potluck_iteration), as: :json
    assert_response :success
  end

  test "should update potluck_iteration" do
    patch potluck_iteration_url(@potluck_iteration), params: { potluck_iteration: { date_range: @potluck_iteration.date_range, date_range_type: @potluck_iteration.date_range_type } }, as: :json
    assert_response :success
  end

  test "should destroy potluck_iteration" do
    assert_difference("PotluckIteration.count", -1) do
      delete potluck_iteration_url(@potluck_iteration), as: :json
    end

    assert_response :no_content
  end
end
