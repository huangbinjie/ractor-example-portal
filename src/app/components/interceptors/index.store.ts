import { Store } from "ractor";
import { ShowModel } from "@components/interceptors/ShowModel";

/*
* TIME_OUT("timeout","帐号已超时"),
* KICKED_OUT("kicked_out","帐号被踢出"),
* NEED_LOGIN("need_login","请登陆"),
* MISS_TOKEN("miss_token","缺少token"),
* INVALID_TOKEN("invalid_token","无效token"),
* TYPE_ERROR_TOKEN("type_error_token","非access token"),
* ILLEGAL_USER("illegal_user","用户不存在或禁用"),
* INITAL_PW("inital_pw","初始密码"),
* NOT_EXIST_SEEESION("not_exist_session","不存在此session")
*/

export type InterceptorsState = {
  title: string,
  visible: boolean,
  status: string
}
export class InterceptorsStore extends Store<InterceptorsState>{
  public state: InterceptorsState  = {
    title: '登录超时',
    visible: false,
    status: ''
  }

  public createReceive() {
    return this.receiveBuilder()
      .match(ShowModel, ({status}) => {
        if (status === 'kickedout') {
          this.setState({
            title: '登录异常',
            visible: true,
            status
          })
        } else {
          // timeout || 请登录
          this.setState({
            title: '登录超时',
            visible: true,
            status
          })
        }
      })
      .build()
  }
}