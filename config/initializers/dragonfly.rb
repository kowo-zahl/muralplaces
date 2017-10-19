require 'dragonfly'

# Configure
Dragonfly.app.configure do
  plugin :imagemagick,
    convert_command: "/usr/bin/convert",    # defaults to "convert"
    identify_command: "/usr/bin/identify"  # defaults to "identify"
  secret "9672b9b218146947895cd2020be9a1ebfcb621706126df706d770433c5d2de50"

  url_format "/media/:job/:name"

  datastore :file,
    root_path: Rails.root.join('public/system/dragonfly', Rails.env),
    server_root: Rails.root.join('public')
end

# Logger
Dragonfly.logger = Rails.logger

# Mount as middleware
Rails.application.middleware.use Dragonfly::Middleware

# Add model functionality
if defined?(ActiveRecord::Base)
  ActiveRecord::Base.extend Dragonfly::Model
  ActiveRecord::Base.extend Dragonfly::Model::Validations
end
