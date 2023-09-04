import { makeAutoObservable } from "mobx";
import { IUser } from "../models/User";
import HttpDatasource, { MethodType } from "../datasource/Datasource";

export class UserStore {
  user?: IUser;

  constructor() {
    makeAutoObservable(this);
    this.getUser(1);
  }

  readonly findUserDS = new HttpDatasource<IUser>(
    MethodType.GET,
    "/api/users/:userId"
  );

  readonly updateUserDS = new HttpDatasource<void>(
    MethodType.PUT,
    "/api/users/:userId"
  );

  getUser = (id: number): void => {
    this.findUserDS
      .execute({ userId: id })
      .then((user: IUser) => (this.user = user));
  };

  updateUser = (user: IUser): Promise<void> => {
    return this.updateUserDS.execute({ userId: user.id }, { ...user });
  };
}
