require 'test_helper'

class GalleriesControllerTest < ActionController::TestCase
  setup do
    @gallery = galleries(:gallerie1)

  end

  test "showGalleries" do
    sign_in users(:user1)
    get(:showGalleries,{'id'=>"1"},{'user_id'=>'1'})
    assert_response :success
  end

  test "browse" do
    get(:browse,{'id'=>"1"},nil)
    assert_response :success
  end

 
 # test "should get index" do
 #   get :index
 #   assert_response :success
 #   assert_not_nil assigns(:galleries)
 # end

 # test "should get new" do
 #   sign_in users(:user1)
 #   get :new
 #   assert_response :success
 # end

 # test "should create gallery" do
 #   sign_in users(:user1)
 #   assert_difference('Gallery.count') do
 #     post :create, gallery: { thumbUrl: @gallery.thumbUrl, show: @gallery.show, title: @gallery.title, utext: @gallery.utext,dtext: @gallery.dtext }
 #   end

  #  assert_redirected_to gallery_path(assigns(:gallery))
 # end

 # test "should show gallery" do
 #   sign_in users(:user1)
 #   get :show, id: @gallery
 #   assert_response :success
 # end
#TODO: wenn ich user1 nehme, dann läd er art1 rein und ich bekomme hier nen Fehler im Template, das art.image.thumb nicht gefunden wird. art1 hat ja auch bis jetzt kein Bild
# 1. Art1 ein Bild zuweisen.
# 2. Rausbekommen wie man dem Template beibringt bei art.nil? thumb nicht anzuwenden.
  test "should get edit" do
    sign_in users(:user2)
    get :edit, id: @gallery
    assert_response :success
  end

  test "should update gallery" do
    sign_in users(:user1)
    patch :update, id: @gallery, gallery: { thumbUrl: @gallery.thumbUrl, show: @gallery.show, title: @gallery.title, utext: @gallery.utext,dtext: @gallery.dtext }
    assert_redirected_to gallery_path(assigns(:gallery))
  end

  test "should destroy gallery" do
    sign_in users(:user1)
    assert_difference('Gallery.count', -1) do
      delete :destroy, id: @gallery
    end

    assert_redirected_to galleries_path
  end
end
