import { Store } from "ractor";

export class LoggerStore extends Store<any> {
  public preStart() {
    this.context.system.eventStream.onAny((_, obj) => {
      if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
        const date = new Date()
        /* tslint:disable:no-console */
        console.info(date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds(), obj)
      }
    })
  }
  public createReceive() {
    return this.receiveBuilder().build()
  }
}