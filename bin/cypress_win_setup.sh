#!/bin/bash

cd ..
CYPRESS_VERSION=$($PWD/node_modules/.bin/cypress --version | head -n -1 | awk '{print $NF}')
CYPRESS_DIRECTOR_URL="https://opsonion-ci-testing.herokuapp.com"
CYPRESS_APP_CONFIG_DIR="/mnt/c/Users/*/AppData/Local/Cypress/Cache/*/Cypress/resources/app/packages/server/config/app.yml"
sed -i -E "s@(api_url:) (.*)@\1 \"${CYPRESS_DIRECTOR_URL}/\"@g" ${CYPRESS_APP_CONFIG_DIR}
