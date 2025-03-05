#!/bin/bash

echo "Deployement Started..."

pm2 flush

git checkout yarn.lock

git pull origin master

rm -rf node_modules .next

npm cache clean --force

pm2 stop ticketshop-frontend

yarn install

yarn run build

pm2 start npm --name "ticketshop-frontend" -- start

pm2 flush

echo "Deployement Completed..."
