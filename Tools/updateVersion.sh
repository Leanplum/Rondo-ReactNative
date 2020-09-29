if [ -z "$LEANPLUM_SDK_VERSION" ]; then
  version="latest"; 
  if [ ! -z "$TRAVIS_TAG" ]; then
    version="$TRAVIS_TAG"; 
  fi
else 
  version="$LEANPLUM_SDK_VERSION"; 
fi

if [[ "$OSTYPE" == "darwin"* ]]; then
  # mac os 
  sed -i '' -e "s/\"@leanplum\/react-native-sdk\": \".*\"/\"@leanplum\/react-native-sdk\": \"$version\"/g" "package.json"
else
  #linux
  sed -i -e "s/\"@leanplum\/react-native-sdk\": \".*\"/\"@leanplum\/react-native-sdk\": \"$version\"/g" "package.json"
fi
