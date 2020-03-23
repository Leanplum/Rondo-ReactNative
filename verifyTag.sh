#!/bin/bash
if [[ -n "${LEANPLUM_SDK_VERSION}" ]]; then
    if git tag $LEANPLUM_SDK_VERSION; then 
        DEPLOY_APP="true"
    else 
        DEPLOY_APP="false"
    fi
else
    DEPLOY_APP="false"
fi