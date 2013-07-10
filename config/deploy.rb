require "bundler/capistrano"
# The name of your application.  Used for deployment directory and filenames
# and Apache configs. Should be unique on the Brightbox
set :application, "cites-checklist"
set :default_stage, 'staging'
require 'capistrano/ext/multistage'

set(:pub_key) { Capistrano::CLI.ui.ask ("Enter Name of Public key: ") }
ssh_options[:keys] = [File.join(ENV["HOME"], ".ssh", "#{pub_key}")] 
 
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
# ssh_options[:forward_agent] = true

# Forces a Pty so that svn+ssh repository access will work. You
# don't need this if you are using a different SCM system. Note that
# ptys stop shell startup scripts from running.
default_run_options[:pty] = true

## Deployment settings
set :user, "rails"
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

after "deploy:update", "deploy:cleanup"

