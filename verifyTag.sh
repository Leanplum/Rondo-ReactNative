#!/bin/bash
if [[ -n "${LEANPLUM_SDK_VERSION}" ]]; then
    if git tag $LEANPLUM_SDK_VERSION; then 
        $DEPLOY_APP="true1"
    else 
        $DEPLOY_APP="false1"
    fi
else
    $DEPLOY_APP="false1"
fi