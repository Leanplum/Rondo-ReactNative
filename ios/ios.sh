# CREATE KEY CHAIN
security create-keychain -p $CUSTOM_KEYCHAIN_PASSWORD ios-build.keychain
security default-keychain -d user -s ios-build.keychain
security unlock-keychain -p $CUSTOM_KEYCHAIN_PASSWORD ios-build.keychain
security set-keychain-settings -t 3600 -l ~/Library/Keychains/ios-build.keychain
# IMPORT ASSETS INTO KEY CHAIN
security import AppleWWDRCA.cer -k ios-build.keychain -A
security import iPhone_distribution.p12 -k ios-build.keychain -P $SECURITY_PASSWORD -A
security set-key-partition-list -S apple-tool:,apple: -s -k $CUSTOM_KEYCHAIN_PASSWORD ios-build.keychain > /dev/null
# PROVISIONING PROFILE
mkdir -p ~/Library/MobileDevice/Provisioning\ Profiles
cp "Rondo_ReactNative_AdHoc_Distribution.mobileprovision" ~/Library/MobileDevice/Provisioning\ Profiles
# BUILD ARCHIVE
sudo gem install xcpretty
sh ios-build.sh
# EXPORT ARCHIVE
sh ios-export.sh