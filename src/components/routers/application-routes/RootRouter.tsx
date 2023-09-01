import Menu from "../../menu/Menu";
import NotFound from "../../not_found/NotFound";
import BaseRoute from "../domain/BaseRoute";
import { IndexRoute } from "../domain/IndexRoute";
import { RootRoute } from "../domain/RootRoute";
import { UserRouter } from "./user/UserRouter";

export class RootRouter extends RootRoute {
  readonly user: UserRouter = new UserRouter(this);

  readonly notFound: BaseRoute = new BaseRoute("notFound", NotFound, this);

  readonly indexRoute: IndexRoute = new IndexRoute(this, <Menu />);
}

const router = new RootRouter();
export default router;
