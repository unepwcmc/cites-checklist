namespace :rsync do
desc "Rsync of existing directories"
task :sync do
 on roles(:app) do
   execute "rsync -av #{release_path}/app/javascripts/config.js #{shared_path}/config.js"
   end
  end
end
