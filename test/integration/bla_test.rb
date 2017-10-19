=begin
class BlogTest < ActionDispatch::IntegrationTest




  test 'show page' do
    visit "/"
    click_link "Login"
    fill_in 'user_login', :with => 'user1@test.eu'
    fill_in 'user_password', :with => 'abcdef1'
    click_button "Sign in"
  end
  
  test 'second test' do
    visit "/users"
  end
end
=end