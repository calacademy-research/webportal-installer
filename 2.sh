#!/usr/bin/bash
cd $(dirname $0)
if [[ $# -eq 0 ]] ; then
    echo 'Specify core name as argument. e.g.: botany'
    exit 0
fi
export url="http://localhost:8983/solr/$1/update/csv?commit=true&encapsulator=\"&escape=\&header=true"
curl $url --data-binary @build/cores/$1/PortalFiles/PortalData.csv -H 'Content-type:application/csv'

