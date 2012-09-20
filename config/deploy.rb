require "bundler/capistrano"
# The name of your application.  Used for deployment directory and filenames
# and Apache configs. Should be unique on the Brightbox
set :application, "cites-checklist"

# Primary domain name of your application. Used in the Apache configs
set :domain, "unepwcmc-005.vm.brightbox.net"

## List of servers
server "unepwcmc-005.vm.brightbox.net", :web, :primary => false

set :default_stage, 'staging'

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

after "deploy:update_code", "deploy:symlink"
namespace :deploy do
  task :symlink, :except => { :no_release => true } do
    run "ln -nfs #{shared_path}/config.js #{release_path}/app/javascripts/config.js"
  end
end

after "deploy:symlink", "assets:precompile"
namespace :assets do
  desc "precompile assets"
  task :precompile do
    run("cd #{release_path} && bundle exec rakep clean && bundle exec rakep build")
  end
end

