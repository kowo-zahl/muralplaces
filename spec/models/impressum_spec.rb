require "rails_helper"

RSpec.describe Impressum, :type => :model do
  it "has position" do
    expect{create(:good_impressum)}.not_to raise_error
    expect{create(:bad_impressum)}.to raise_error(ActiveRecord::RecordInvalid)
  end

  it "up" do
      impressum = create(:good_impressum)
      impressum2 = create(:good_impressum)
      impressum2.position = 0
      impressum2.up
     # expect(impressum2.position).to eq(2)
     # expect(impressum.position).to eq(1)
      #TODO: up and down
  end
  
  

end