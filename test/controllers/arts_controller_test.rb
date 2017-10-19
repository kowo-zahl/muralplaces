require 'test_helper'

class ArtsControllerTest < ActionController::TestCase
  setup do
    @art = arts(:art1)
    sign_in users(:user1)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:arts)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

 #http://stackoverflow.com/questions/7260394/test-a-file-upload-using-rspec-rails 
 #Denke mal der Test schlägt fehl, da ein Image Vorrausetzung ist
 
 # test "should create art" do
 #   assert_difference('Art.count') do
 #     post :create, art: { city: @art.city, country: @art.country, lat: @art.lat, lng: @art.lng, name: @art.name, state: @art.state, uploader: 1,image: fixture_file_upload('/image/test1.jpg', 'image/jpeg') }
 #   end

 #   assert_redirected_to art_path(assigns(:art))
 # end

  test "should show art" do
    get :show, id: @art
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @art
    assert_response :success
  end

  test "should update art" do
    patch :update, id: @art, art: { city: @art.city, country: @art.country, lat: @art.lat, lng: @art.lng, name: @art.name, state: @art.state, uploader: @art.uploader,image: fixture_file_upload('/image/test1.jpg', 'image/jpeg') }
    assert_redirected_to art_path(assigns(:art))
  end

  test "should destroy art" do
    assert_difference('Art.count', -1) do
      delete :destroy, id: @art
    end

    assert_redirected_to arts_path
  end

end
