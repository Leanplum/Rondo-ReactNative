set -e
set -x

xcodebuild \
  -workspace RondoApp.xcworkspace \
  -scheme RondoApp \
  -sdk iphoneos \
  -configuration Release \
  -archivePath RondoApp.xcarchive \
  PROVISIONING_PROFILE="Rondo ReactNative AdHoc Distribution" \
  CODE_SIGN_IDENTITY="iPhone Distribution: Leanplum, Inc. (4XLWYATZ5P)" \
  archive | xcpretty && exit ${PIPESTATUS[0]}