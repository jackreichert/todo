#!/bin/sh

cdk deploy --outputs-file ./cdk-outputs.json
success=$?
if [ $success != 0 ]; then
    exit $success
fi

bash sync-app.sh