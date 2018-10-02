import { Store } from "ractor";
import { InitiateApp } from "@app/stores/InitiateApp";
import { AppPermissionService } from "@app/services/app-permission.service";
import { AppPermission } from "@app/types/Permission";
import { system } from "@app/system/system";
import { Push } from "react-router-ractor";

export type PermissionStoreState = { permissions: AppPermission[] }

export class PermissionStore extends Store<PermissionStoreState> {
  public state = { permissions: [] }
  private permissionService = new AppPermissionService
  public createReceive() {
    return this.receiveBuilder()
      .match(InitiateApp, async () => {
        const permissions = await this.permissionService.getPermission()
        if (permissions) {
          this.setState({ permissions });
        } else {
          system.dispatch(new Push('/promission-error'));
        }
        // if (permissions.some(item => item.code === 'systemConfiguration.interface.menu')
        //   && !permissions.some(item => item.code === 'systemConfiguration.interface.widget')
        //   && !permissions.some(item => item.code === 'systemConfiguration.interface.corporation')) {
        //   system.dispatch(new Push('/promission-error'));
        // } else {
        // }
      })
      .build()
  }
}