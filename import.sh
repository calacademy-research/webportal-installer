#!/usr/bin/bash
cd $(dirname $0)

all_collections=(botany iz orn orn-en mam)

for t in ${all_collections[@]}; do
  ./0.sh $t >& 0.$t.log
done

for t in ${all_collections[@]}; do
  ./1.sh $t >& 1.$t.log
done

sleep 120

for t in ${all_collections[@]}; do
  ./2.sh $t >& 2.$t.log
done

./3.sh

