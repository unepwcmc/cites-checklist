require "bundler/capistrano"

# The name of your application.  Used for deployment directory and filenames
# and Apache configs. Should be unique on the Brightbox
set :application, "cites-checklist"

set :default_stage, 'staging'
require 'capistrano/ext/multistage'

require 'rvm/capistrano'
set :rvm_ruby_string, '2.1.5'

set :generate_webserver_config, false

# Target directory for the application on the web and app servers.
#set(:deploy_to) { File.join("", "home", user, application) }
set :deploy_to, "/home/rails/#{application}"
# URL of your source repository. By default this will just upload
# the local directory.  You should probably change this if you use
# another repository, like git or subversion.

set :repository,  "git@github.com:unepwcmc/cites-checklist.git"
set :branch, "master"
set :scm, :git
set :scm_username, "unepwcmc-read"
set :deploy_via, :remote_cache

# SSH options. The forward agent option is used so that loopback logins
# with keys work properly
ssh_options[:forward_agent] = true

# Forces a Pty so that svn+ssh repository access will work. You
# don't need this if you are using a different SCM system. Note that
# ptys stop shell startup scripts from running.
default_run_options[:pty] = true

# if you want to clean up old releases on each deploy uncomment this:
after "deploy:restart", "deploy:cleanup"

# If you are using Passenger mod_rails uncomment this:
namespace :deploy do
  task :start do ; end
  task :stop do ; end
  task :restart, :roles => :app, :except => { :no_release => true } do
    run "#{try_sudo} touch #{File.join(current_path,'tmp','restart.txt')}"
  end
end

## Deployment settings
set :user, "rails"
set :use_sudo, false
set :rails_env, :production

after "deploy:create_symlink", "deploy:link_js_config"
namespace :deploy do
  task :link_js_config, :except => { :no_release => true } do
    run "ln -nfs #{shared_path}/config.js #{release_path}/app/javascripts/config.js"
  end
end

after "deploy:link_js_config", "assets:precompile"
namespace :assets do
  desc "precompile assets"
  task :precompile do
    run("cd #{release_path} && bundle exec rakep clean && bundle exec rakep build")
  end
end
