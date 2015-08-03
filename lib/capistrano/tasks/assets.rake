namespace :assets do
  desc "precompile assets"
  task :precompile do
    execute("cd #{release_path} && bundle exec rakep clean && bundle exec rakep build")
  end
end
