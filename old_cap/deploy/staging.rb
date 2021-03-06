set :rails_env, "staging"
# Primary domain name of your application. Used in the Apache configs
set :domain, "unepwcmc-012.vm.brightbox.net"
## List of servers
server "unepwcmc-012.vm.brightbox.net", :app, :web, :db, :primary => true

set :server_name, "#{application}.unepwcmc-012.vm.brightbox.net"
set :sudo_user, "rails"
set :app_port, "80"
set :branch, :develop

desc "Configure VHost"
task :config_vhost do
vhost_config =<<-EOF
server {
  listen 80;

  client_max_body_size 4G;
  server_name #{application}.unepwcmc-012.vm.brightbox.net #{application}.sw01.matx.info;
  keepalive_timeout 5;
  root #{deploy_to}/current/public;
  passenger_enabled on;
  rails_env staging;
  gzip on;
  location ^~ /assets/ {
   expires max;
    add_header Cache-Control public;
  }

  if (-f $document_root/system/maintenance.html) {
    return 503;
  }

  error_page 500 502 504 /500.html;
  location = /500.html {
    root #{deploy_to}/current/public;
  }

  error_page 503 @maintenance;
  location @maintenance {
    rewrite  ^(.*)$  /system/maintenance.html break;
  }
}
EOF
put vhost_config, "/tmp/vhost_config"
sudo "mv /tmp/vhost_config /etc/nginx/sites-available/#{application}"
sudo "ln -s /etc/nginx/sites-available/#{application} /etc/nginx/sites-enabled/#{application}"
end

after "deploy:setup", :config_vhost
