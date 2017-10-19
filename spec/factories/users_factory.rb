# This will guess the User class
FactoryGirl.define do
  factory :user do
  username               "Test User"
  email                  "user@example.com"
  password               "password"
  password_confirmation  "password"
  end
end