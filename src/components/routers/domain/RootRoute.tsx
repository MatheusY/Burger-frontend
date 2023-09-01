import { Route } from "react-router-dom";
import BaseRoute from "./BaseRoute";
import NavigationRegistry from "./NavigationRegistry";
import ErrorPage from "../../error/ErrorPage";
import Header from "../../header/Header";

export class RootRoute extends BaseRoute {
  constructor() {
    super("/", undefined, undefined);
  }

  public urlPattern = (): string => {
    return "/";
  };

  public asReactRouterDomElement(): JSX.Element {
    return (
      <Route
        key="/"
        path="/"
        element={
          <NavigationRegistry route={this} params={this.params()}>
            <Header />
          </NavigationRegistry>
        }
        errorElement={<ErrorPage />}
      >
        {this.children.map((child) => child.asReactRouterDomElement())}
      </Route>
    );
  }
}
