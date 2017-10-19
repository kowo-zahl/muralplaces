require 'test_helper'

class AllocationsControllerTest < ActionController::TestCase
  setup do
      @allocation = allocations(:allocation1)
    sign_in users(:user1)
  end
  
    test "should update art" do
    patch :update, id: @allocation, allocation: { gallery_id: @allocation.gallery_id, art_id: @allocation.art_id,position: @allocation.position,text: @allocation.text}
    assert_redirected_to Gallery.find(@allocation.gallery_id)
  end
end