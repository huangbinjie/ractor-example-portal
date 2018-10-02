import { Store } from "ractor";
import { AppUser } from "@app/types/User";
import { AppUserService } from "@app/services/app-user.service";
import { InitiateApp } from "@app/stores/InitiateApp";

export type UserState = {
  user?: AppUser
}

export class UserStore extends Store<UserState> {
  private userService = new AppUserService
  public createReceive() {
    return this.receiveBuilder()
      .match(InitiateApp, async () => {
        const user = await this.userService.getUserInfo()
        this.setState({ user })
      })
      .build()
  }
}