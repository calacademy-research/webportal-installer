#!/usr/bin/bash
find . -name "settings.json" -exec sed -i 's/\"imageBaseUrl\": \"\"/\"imageBaseUrl\": \"http:\/\/ibss-images.calacademy.org"/g' {} \;

sudo rm -rf /home/specify/webportal/build.old
sudo mv /home/specify/webportal/build /home/specify/webportal/build.old
sudo mv build /home/specify/webportal
sudo systemctl restart nginx
