require "rails_helper"

RSpec.describe Gallery, :type => :model do

  it "get like and dislike" do

     gallery = create(:gallery)
    expect(gallery.like).to eq(0)
    expect(gallery.dislike).to eq(0)
  end
  it "get first and last item" do
    gallery = create(:gallery,show: true)
    gallery2 = create(:gallery,show: true)
    gallery3 = create(:gallery,show: true)
    expect(gallery.last).to eq(gallery3.id)
    expect(gallery.first).to eq(gallery.id)
  end
    it "get next and prev item" do
    gallery = create(:gallery,show: true)
    gallery2 = create(:gallery,show: true)
    gallery3 = create(:gallery,show: true)
    expect(gallery.next).to eq(gallery2.id)
    expect(gallery3.next).to eq(gallery3.id)
    expect(gallery.prev).to eq(gallery.id)
    expect(gallery3.prev).to eq(gallery2.id)
  end
  it "is setting ThumbnailUrl" do
    gallery = create(:gallery)
    expect(gallery.thumbUrl).to be_empty
    
    art = create(:good_art)
    gallery.art_ids=[art.id]
    gallery.setThumbnail
    expect(gallery.thumbUrl).to include("media")

  end
end