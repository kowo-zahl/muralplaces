FactoryGirl.define do
  factory :art do
    factory :good_art do
      image { File.new("#{Rails.root}/spec/assets/IMAG2920.jpg") } 
    end
    factory :bad_art do
      image { File.new("#{Rails.root}/spec/assets/wrong.txt") } 
    end
  end
end