import Products from "../../../page/product/Products";
import BaseRoute from "../../domain/BaseRoute";
import { IndexRoute } from "../../domain/IndexRoute";
import { RootRouter } from "../RootRouter";

export class ProductRouter extends BaseRoute {
  readonly indexRoute = new IndexRoute(this, <Products />);

  constructor(parent: RootRouter) {
    super("products", undefined, parent);
  }
}
