# if version is specified, use it, otherwise use the one that is set in package.json
if [ -n "$LEANPLUM_SDK_VERSION" ]; then
  version="$LEANPLUM_SDK_VERSION";
  if [ ! -z "$TRAVIS_TAG" ]; then
    version="$TRAVIS_TAG"; 
  fi
fi

if [[ "$OSTYPE" == "darwin"* ]]; then
  # mac os 
  sed -i '' -e "s/\"@leanplum\/react-native-sdk\": \".*\"/\"@leanplum\/react-native-sdk\": \"$version\"/g" "package.json"
else
  #linux
  sed -i -e "s/\"@leanplum\/react-native-sdk\": \".*\"/\"@leanplum\/react-native-sdk\": \"$version\"/g" "package.json"
fi
