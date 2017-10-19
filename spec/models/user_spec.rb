require "rails_helper"

RSpec.describe User, :type => :model do
  it "has unique username" do
    expect{create(:user,username: "test")}.not_to raise_error
    expect{create(:user,username: "test")}.to raise_error
    expect{create(:user,username: "Test")}.to raise_error
  end
  it "has always role registered at creation" do
    user = create(:user)
    role = Role.find_by_name('registered')
    expect(user.role_ids).to include(role.id)
  end
  #TODO: test warden login
end