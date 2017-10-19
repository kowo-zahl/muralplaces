FactoryGirl.define do
  factory :impressum do
    factory :good_impressum do
      position 1
    end
    factory :bad_impressum do
      position ''
    end
  end
end