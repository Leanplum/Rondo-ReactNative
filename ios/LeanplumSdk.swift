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
  func track(_ event: String, params: NSDictionary) -> Void {
    let withParameters = params as! Dictionary<String,Any>
    Leanplum.track(event, withParameters: withParameters)
  }
  
}
