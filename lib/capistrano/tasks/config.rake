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



 if (-f $document_root/system/maintenance.html) {
   return 503;
 }

 error_page 500 502 504 /500.html;
 location = /500.html {
   root /home/rails/cites-checklist/current/public;
 }

  error_page 503 @maintenance;
  location @maintenance {
    rewrite  ^(.*)$  /system/maintenance.html break;
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


