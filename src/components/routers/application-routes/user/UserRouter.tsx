import UserEdit from "../../../user/UserEdit";
import UserInfo from "../../../user/UserInfo";
import BaseRoute from "../../domain/BaseRoute";
import { IndexRoute } from "../../domain/IndexRoute";
import { RootRouter } from "../RootRouter";

export class UserRouter extends BaseRoute {
  readonly edit = new BaseRoute("edit", UserEdit, this);

  readonly indexRoute = new IndexRoute(this, <UserInfo />);

  constructor(parent: RootRouter) {
    super("user/:userId", undefined, parent);
  }
}
