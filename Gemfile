source 'https://rubygems.org'

gem "json"
gem "rack"
gem "rake-pipeline", :git => "https://github.com/livingsocial/rake-pipeline.git"
gem "rake-pipeline-web-filters", :git => "https://github.com/wycats/rake-pipeline-web-filters.git"

gem "compass"
gem "uglifier"

gem "libv8", '3.16.14.15'
gem "therubyracer", '0.12.3'

group :development do
  gem 'capistrano', '3.4.0', require: false
  gem 'capistrano-bundler', '~> 1.1', require: false
  gem 'capistrano-maintenance', '~> 1.0'
  gem 'capistrano-rvm',   '~> 0.1', require: false
  gem 'capistrano-passenger', '~> 0.1.1', require: false
  gem "jslint_on_rails"

  # Support ed25519 SSH keys
  gem 'rbnacl', '4.0.2'
  gem 'rbnacl-libsodium', '1.0.16'
  gem 'bcrypt_pbkdf', '1.1.0'
  gem 'ed25519', '1.2.4'
end
