//
//  LeanplumTypeUtils.swift
//  RondoApp
//
//  Created by Alik . Risco on 6.02.20.
//  Copyright © 2020 Facebook. All rights reserved.
//

import Foundation
import Leanplum

enum LeanplumKinds: String {
  case INT = "integer"
  case FLOAT = "float"
  case STRING = "string"
  case BOOLEAN = "bool";
  case DICTIONARY = "group"
  case ARRAY = "list"
  case FILE = "file"
}

class LeanplumTypeUtils {
  static func createVar(key: String, value: Any) -> LPVar? {
    var lpVar: LPVar;
    switch value.self {
    case is Int, is Double, is Float:
      lpVar = LPVar.define(key, with: value as? Double ?? 0.0)
    case is Bool:
      lpVar = LPVar.define(key, with: value as? Bool ?? false)
    case is String:
      lpVar = LPVar.define(key, with: value as? String)
    case is Array<Any>:
      lpVar = LPVar.define(key, with: value as? Array)
    case is Dictionary<String, Any>:
      lpVar = LPVar.define(key, with: value as? Dictionary)
    default:
      return nil
    }
    return lpVar;
  }
}
