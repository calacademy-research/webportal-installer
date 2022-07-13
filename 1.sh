#!/usr/bin/bash
cd $(dirname $0)

if [[ $# -eq 0 ]] ; then
    echo 'Specify core name as argument. e.g.: botany'
    exit 0
fi
make clean
make
export SOLR_VERSION='7.5.0'
export TARGET_SOLR_DIR=solr-$SOLR_VERSION/server/solr
echo solr verion: $SOLR_VERSION 
echo core: $1
echo target dir: $TARGET_SOLR_DIR
./solr-$SOLR_VERSION/bin/solr delete -c $1
./solr-$SOLR_VERSION/bin/solr stop -all
mkdir -p $TARGET_SOLR_DIR/$1
cp -r build/cores/$1/core/* $TARGET_SOLR_DIR/$1
cp build/cores/$1/web.xml solr-$SOLR_VERSION/server/solr-webapp/webapp/WEB-INF/web.xml 
./solr-$SOLR_VERSION/bin/solr start
echo Complete. If it ran with no errors, run part 2.
