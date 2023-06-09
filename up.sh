#!/bin/bash

echo "starting cashflow"

echo "creating docker network"

docker network create -d bridge cashflow --subnet 172.21.0.0/16

echo "starting infra"

cd infra

cd auth
docker compose up -d
cd ..
