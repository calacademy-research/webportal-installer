#!/usr/bin/bash
cd $(dirname $0)

if [[ $# -eq 0 ]] ; then
    echo 'Specify core name as argument. e.g.: botany'
    exit 0
fi

cp /ibss-alt/$1.zip /ibss-alt/webportal-installer/specify_exports
