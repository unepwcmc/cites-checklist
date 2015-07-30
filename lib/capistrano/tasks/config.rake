namespace :config do
task :setup do

vhost_config =<<-EOF
server {
  listen 80;

  client_max_body_size 4G;
  server_name #{fetch(:server_name)};
  keepalive_timeout 5;
  root #{deploy_to}/current/public;
  passenger_enabled on;
  rails_env #{fetch(:rails_env)}:


 location ~ ^/(assets)/  {
  root #{deploy_to}/current/public;
  allow all;
  gzip on;
  expires max;
  add_header Cache-Control public;
  # access_log /dev/null;
}

error_page 503 @503;
# Return a 503 error if the maintenance page exists.
if (-f #{deploy_to}shared/public/system/maintenance.html) {
  return 503;
}
location @503 {
  # Serve static assets if found.
  if (-f $request_filename) {
    break;
  }
  # Set root to the shared directory.
  root #{deploy_to}/shared/public;
  rewrite ^(.*)$ /system/maintenance.html break;
}

}



}

  
EOF

  on roles(:app) do
     execute "sudo mkdir -p /etc/nginx/sites-available"
     upload! StringIO.new(vhost_config), "/tmp/vhost_config"
     execute "sudo mv /tmp/vhost_config /etc/nginx/sites-available/#{fetch(:application)}"
     execute "sudo ln -s /etc/nginx/sites-available/#{fetch(:application)} /etc/nginx/sites-enabled/#{fetch(:application)}"
    end
  end
end


