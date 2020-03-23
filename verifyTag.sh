#!/bin/bash
if [[ -n "${LEANPLUM_SDK_VERSION}" ]]; then
    if git tag $LEANPLUM_SDK_VERSION; then 
        echo 'TAG VERIFY TRUE'
    else 
        echo 'TAG VERIFY FALSE'
    fi
else
    echo 'LEANPLUM_SDK_VERSION DOES NOT EXIST'
fi