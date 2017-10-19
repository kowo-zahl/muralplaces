require 'test_helper'

class ImpressumsControllerTest < ActionController::TestCase
  setup do
    @impressum = impressums(:one)
    sign_in users(:user1)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:impressums)
  end

  test "should get new" do
    get :new
    assert_redirected_to impressums_path
  end

  test "should create impressum" do
    assert_difference('Impressum.count') do
      post :create, impressum: { position: @impressum.position, text: @impressum.text }
    end

    assert_redirected_to impressums_path
  end

  test "should show impressum" do
    get :show, id: @impressum
    assert_redirected_to impressums_path
  end

  test "should get edit" do
    get :edit, id: @impressum
    assert_redirected_to impressums_path
  end

  test "should update impressum" do
    patch :update, id: @impressum, impressum: { position: @impressum.position, text: @impressum.text }
    assert_redirected_to impressums_path
  end

  test "should destroy impressum" do
    assert_difference('Impressum.count', -1) do
      delete :destroy, id: @impressum
    end

    assert_redirected_to impressums_path
  end
end
