set -e
set -x
xcodebuild \
  -exportArchive \
  -archivePath RondoApp.xcarchive \
  -exportOptionsPlist ExportOptions.plist \
  -exportPath build