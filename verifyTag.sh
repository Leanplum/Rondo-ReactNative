#!/bin/bash
if [[ -n "${LEANPLUM_SDK_VERSION}" ]]; then
    if git tag $LEANPLUM_SDK_VERSION; then 
        export DEPLOY_APP="true"
    else 
        export DEPLOY_APP="false"
    fi
else
    export DEPLOY_APP="false"
fi