namespace :symlink do
desc "Symlink config.js file"
task :config do
 on roles(:app) do
   execute "ln -nfs #{shared_path}/config.js #{release_path}/app/javascripts/config.js"
   end
  end
end
