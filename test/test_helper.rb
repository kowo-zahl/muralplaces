ENV['RAILS_ENV'] ||= 'test'
require File.expand_path('../../config/environment', __FILE__)
require 'rails/test_help'
require 'factory_girl_rails'

#capybara config
require 'capybara/rails'
require 'capybara/poltergeist'
Capybara.configure do |config|
#  config.run_server = true
 # config.default_driver = :poltergeist
  config.default_driver = :selenium
  #config.app_host = 'http://localhost:3000' # change url
end

#Capybara in IntegrationTests laden
class ActionDispatch::IntegrationTest
  # Make the Capybara DSL available in all integration tests
  include Capybara::DSL
end


#der Seleniumbrowser soll sich nicht gleich schließen, nach dem Testlauf
Capybara::Selenium::Driver.class_eval do
  def quit
    puts "Press RETURN to quit the browser"
    $stdin.gets
    @browser.quit
  rescue Errno::ECONNREFUSED
    # Browser must have already gone
  end
end


class ActiveSupport::TestCase
  # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
  fixtures :all

  # Add more helper methods to be used by all tests here...
    class ActionController::TestCase
    include Devise::TestHelpers
  end
end



