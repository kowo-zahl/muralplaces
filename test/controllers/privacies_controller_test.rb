require 'test_helper'

class PrivaciesControllerTest < ActionController::TestCase
  setup do
    @privacy = privacies(:one)
    sign_in users(:user1)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:privacies)
  end

  test "should get new" do
    get :new
    assert_redirected_to privacies_path
  end

  test "should create privacy" do
    assert_difference('Privacy.count') do
      post :create, privacy: { position: @privacy.position, text: @privacy.text }
    end

    assert_redirected_to privacies_path
  end

  test "should show privacy" do
    get :show, id: @privacy
    assert_redirected_to privacies_path
  end

  test "should get edit" do
    get :edit, id: @privacy
    assert_redirected_to privacies_path
  end

  test "should update privacy" do
    patch :update, id: @privacy, privacy: { position: @privacy.position, text: @privacy.text }
    assert_redirected_to privacies_path
  end

  test "should destroy privacy" do
    assert_difference('Privacy.count', -1) do
      delete :destroy, id: @privacy
    end

    assert_redirected_to privacies_path
  end
end
