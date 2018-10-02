/// <reference path="./index.d.ts" />

import development from "./development";
import production from "./production"

let realEnv

switch (process.env.NODE_ENV) {
  case "development":
    realEnv = development
    break;
  case "production":
    realEnv = production
    break;
  default:
    realEnv = development
    break;
}

export default realEnv