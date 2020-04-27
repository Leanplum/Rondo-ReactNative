if [ -z "$LEANPLUM_SDK_VERSION" ]; then version="latest"; else version="$LEANPLUM_SDK_VERSION"; fi

sed -i '' -e "s/\"@leanplum\/react-native-sdk\": \".*\"/\"@leanplum\/react-native-sdk\": \"$version\"/g" "package.json"