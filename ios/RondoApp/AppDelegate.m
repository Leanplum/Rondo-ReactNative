/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"

#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <Leanplum/Leanplum.h>
#import <LeanplumLocation/LPLocationManager.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                                   moduleName:@"RondoApp"
                                            initialProperties:nil];

  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  
  id notificationCenterClass = NSClassFromString(@"UNUserNotificationCenter");
  if (notificationCenterClass) {
      // iOS 10.
      SEL selector = NSSelectorFromString(@"currentNotificationCenter");
      id notificationCenter =
      ((id (*)(id, SEL)) [notificationCenterClass methodForSelector:selector])
      (notificationCenterClass, selector);
      if (notificationCenter) {
          selector = NSSelectorFromString(@"requestAuthorizationWithOptions:completionHandler:");
          IMP method = [notificationCenter methodForSelector:selector];
          void (*func)(id, SEL, unsigned long long, void (^)(BOOL, NSError *__nullable)) =
          (void *) method;
          func(notificationCenter, selector,
               0b111, /* badges, sounds, alerts */
               ^(BOOL granted, NSError *__nullable error) {
                   if (error) {
                       NSLog(@"Leanplum: Failed to request authorization for user "
                             "notifications: %@", error);
                   }
               });
      }
      [[UIApplication sharedApplication] registerForRemoteNotifications];
  } else if ([[UIApplication sharedApplication] respondsToSelector:
              @selector(registerUserNotificationSettings:)]) {
      // iOS 8-9.
      UIUserNotificationSettings *settings = [UIUserNotificationSettings
                                              settingsForTypes:UIUserNotificationTypeAlert |
                                              UIUserNotificationTypeBadge |
                                              UIUserNotificationTypeSound categories:nil];
      [[UIApplication sharedApplication] registerUserNotificationSettings:settings];
      [[UIApplication sharedApplication] registerForRemoteNotifications];
  } else {
      // iOS 7 and below.
      #pragma clang diagnostic push
      #pragma clang diagnostic ignored "-Wdeprecated-declarations"
      [[UIApplication sharedApplication] registerForRemoteNotificationTypes:
      #pragma clang diagnostic pop
       UIUserNotificationTypeSound | UIUserNotificationTypeAlert | UIUserNotificationTypeBadge];
  }
  
  return YES;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler
{
    // Needs to be called if swizzling is disabled in Info.plist otherwise it won’t affect SDK if swizzling is enabled.
    [Leanplum didReceiveRemoteNotification:userInfo

fetchCompletionHandler:completionHandler];
}

- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken
{
    // Needs to be called if swizzling is disabled in Info.plist otherwise it won’t affect SDK if swizzling is enabled.
    [Leanplum didRegisterForRemoteNotificationsWithDeviceToken:deviceToken];
}

- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error
{
    // Needs to be called if swizzling is disabled in Info.plist otherwise it won’t affect SDK if swizzling is enabled.
    [Leanplum didFailToRegisterForRemoteNotificationsWithError:error];
}

@end
