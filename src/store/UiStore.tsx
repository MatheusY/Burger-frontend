import { makeAutoObservable } from "mobx";
import BaseRoute from "../components/routers/domain/BaseRoute";

export interface INotification {
  type: string;
  message: string;
  created: Date;
  key: string;
}

export class UiStore {
  route?: BaseRoute;
  params?: any;
  notifications: INotification[] = [];
  redirectToUrl?: string;
  constructor() {
    makeAutoObservable(this);
  }

  onRoute = (route: BaseRoute, params: any) => {
    this.route = route;
    this.params = params;
    this.redirectToUrl = undefined;
  };
}
