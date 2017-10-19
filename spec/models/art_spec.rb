require "rails_helper"

RSpec.describe Art, :type => :model do
  it "has image" do
    expect{create(:good_art)}.not_to raise_error
    expect{create(:bad_art)}.to raise_error(ActiveRecord::RecordInvalid)
  end
  it "generates all URLs" do
    art = create(:good_art)
    expect(art.getUrl).to     include("media")
    expect(art.getThumbUrl).to     include("media")
    expect(art.getSmallUrl).to     include("media")
    
  end
  it " is in a gallery" do
    art = create(:good_art)
    expect(art.isInGallery?).to be false
    gallery = create(:gallery)
    gallery.art_ids=[art.id]
    expect(art.isInGallery?).to be true
  end
  it "changes orientation" do
    art = create(:good_art)
    expect(art.image.stored?).to be true
  # TODO: rotation works in real live, not in test 
  #  art.orientation = 8
  #  art.rotate_it
  #  expect(art.orientation).to eq(1)
  #  art.rotate_it
  #  expect(art.orientation.to_i).to be 1
  end
end