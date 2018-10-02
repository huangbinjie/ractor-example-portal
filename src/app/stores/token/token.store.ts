import { Store } from "ractor";
import * as Cookie from "js-cookie"
import { Push } from "react-router-ractor";
import { AppToken } from "@app/types/Token"
import { InitiateApp } from "@app/stores/InitiateApp";
import { TryRefreshToken } from "@app/stores/token/TryRefreshToken";
import environment from "@environment";
import { AppTokenService } from "@app/services/app-token.service";
import { RefreshToken } from "@app/stores/token/RefreshToken";

export type TokenStoreState = {
  token?: AppToken
}

export class TokenStore extends Store<TokenStoreState>{
  private tokenService = new AppTokenService
  private timer: NodeJS.Timer

  public preStart() {
    // 5分钟刷新token
    this.timer = setInterval(() => this.context.system.dispatch(new TryRefreshToken), 60000 * 5)
  }

  public postStop() {
    clearInterval(this.timer)
  }

  public createReceive() {
    return this.receiveBuilder()
      .match(InitiateApp, () => {
        const tokenCookie: string | undefined = localStorage.getItem('ccmsRequestCredential') || Cookie.get("ccmsRequestCredential")

        if (tokenCookie) {
          const token: AppToken = JSON.parse(decodeURIComponent(tokenCookie))
          this.setState({ token })
        } else {
          this.context.system.dispatch(new Push(environment.loginUrl))
        }
      })
      .match(TryRefreshToken, () => {
        const token = this.state.token
        // 30min reflesh token
        if (token && ((token.client_access_time + token.expires_in * 1000) - Date.now()) <= token.expires_in * 1000 / 2) {
          this.context.system.dispatch(new RefreshToken(token.refresh_token))
        }

        if (token && ((token.client_access_time + token.expires_in * 1000) - Date.now()) <= 0) {
          this.context.system.dispatch(new Push(environment.loginUrl))
        }
      })
      // 真正刷新token的方法
      .match(RefreshToken, async ({ refreshToken }) => {
        const token = await this.tokenService.refresh(refreshToken)
        this.setState({ token })
      })
      .build()
  }
}