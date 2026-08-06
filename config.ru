# config.ru
require 'rake-pipeline'
require 'rake-pipeline/middleware'

# 404 fallback
not_found = proc { [404, { 'Content-Type' => 'text/plain' }, ['not found']] }

# This will internally load & evaluate your Assetfile in the proper DSL context
project = Rake::Pipeline::Project.new('Assetfile')

# Mount it as Rack middleware
run Rake::Pipeline::Middleware.new(not_found, project)
