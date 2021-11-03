#!/usr/bin/bash
#!/usr/bin/bash

if [[ $# -eq 0 ]] ; then
    echo 'Specify core name as argument. e.g.: botany'
    exit 0
fi
export url="http://localhost:8983/solr/$1/update/csv?commit=true&encapsulator=\"&escape=\&header=true"
curl $url --data-binary @build/cores/$1/PortalFiles/PortalData.csv -H 'Content-type:application/csv'

find . -name "settings.json" -exec sed -i 's/\"imageBaseUrl\": \"\"/\"imageBaseUrl\": \"http:\/\/10.2.22.30:8080"/g' {} \;

sudo rm -rf /home/specify/webportal/build.old
sudo mv /home/specify/webportal/build /home/specify/webportal/build.old
sudo mv build /home/specify/webportal
sudo systemctl restart nginx
