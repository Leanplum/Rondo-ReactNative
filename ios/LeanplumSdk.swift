//
//  LeanplumSdk.swift
//  RondoApp
//
//  Created by Alik . Risco on 9.01.20.
//  Copyright © 2020 Facebook. All rights reserved.
//

import Foundation
import Leanplum

@objc(LeanplumSdk)
class LeanplumSdk: NSObject {

  @objc
  static func requiresMainQueueSetup() -> Bool {
    return true
  }
  
  @objc
  func setAppIdForDevelopmentMode(_ appId: String, accessKey: String) -> Void {
    Leanplum.setAppId(appId, withDevelopmentKey: accessKey)
  }
  
  @objc
  func setAppIdForProductionMode(_ appId: String, accessKey: String) -> Void {
    Leanplum.setAppId(appId, withProductionKey: accessKey)
  }
  
  @objc
  func start() -> Void {
    Leanplum.start();
  }

  @objc
  func track(_ event: String, params: NSDictionary) -> Void {
    let withParameters = params as! Dictionary<String,Any>
    Leanplum.track(event, withParameters: withParameters)
  }
  
  @objc
  func disableLocationCollection() -> Void {
    Leanplum.disableLocationCollection()
  }
  
  @objc
  func setDeviceLocation(_ latitude: Double, longitude: Double, type: Int) -> Void {
    let accuracyType = LPLocationAccuracyType(rawValue: UInt32(type))
    Leanplum.setDeviceLocationWithLatitude(latitude, longitude: longitude, type: accuracyType)
  }
  
}
