import { Http } from "lib/http";
import environment from "@environment";
import { AxiosError } from "axios";
import { system } from "@app/system/system";
import { TokenStore } from "@app/stores/token/token.store";
import { ShowModel } from "@components/interceptors/ShowModel";

export class AppService extends Http {
  public processRequestHeaders(headers: object) {
    const tokenStore = system.get(TokenStore)
    if (tokenStore) {
      const token = tokenStore.getInstance().state.token
      if (token) {
        const access_token = token.access_token;
        return { ...headers, Authorization: 'Bearer ' + access_token };
      }
    }
    return headers
  }

  public processError(error: AxiosError) {
    if (error.response) {
      if (error.response.status === 401) {
        if (error.response.data.code === 'kicked_out') {
          system.dispatch(new ShowModel('kickedout'));
        } else {
          system.dispatch(new ShowModel('timeout'));
        }
      }
    }

    throw error
  }

  protected processUrl(url: string) {
    return environment.domain + environment.baseUrl.epassport + url;
  }
}
