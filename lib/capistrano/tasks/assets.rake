namespace :assets do
  desc "precompile assets"
  task :precompile do
    on roles(:app) do
     within release_path do
       execute :bundle, :exec, :'rakep clean'
       execute :bundle, :exec, :'rakep build'
     end
    end
  end
end
