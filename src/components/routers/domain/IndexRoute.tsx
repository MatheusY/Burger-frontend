import { Route } from "react-router-dom";
import BaseRoute from "./BaseRoute";
import NavigationRegistry from "./NavigationRegistry";

export class IndexRoute extends BaseRoute {
  constructor(parent: BaseRoute, component: React.ReactNode) {
    super("", component, parent);
  }

  public asReactRouterDomElement(): JSX.Element {
    return (
      <Route
        key={this.urlPattern()}
        index
        element={
          <NavigationRegistry route={this} params={this.params()}>
            {this.component}
          </NavigationRegistry>
        }
      />
    );
  }
}
