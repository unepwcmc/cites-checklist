namespace :assets do
  desc "precompile assets"
  task :precompile do
    run("cd #{release_path} && bundle exec rakep clean && bundle exec rakep build")
  end
end
