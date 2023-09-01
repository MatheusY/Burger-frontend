import { Route } from "react-router-dom";
import { IURLParameters, buildUrl } from "../../../urls/UrlUtils";
import NavigationRegistry from "./NavigationRegistry";
import ErrorPage from "../../error/ErrorPage";

class BaseRoute {
  readonly parent: BaseRoute | undefined;
  readonly path: string;
  readonly component: any;
  readonly children: BaseRoute[] = [];

  constructor(path: string, compoenent: any, parent?: BaseRoute) {
    this.path = path;
    this.component = compoenent;
    this.parent = parent;
    if (parent) {
      parent.addChild(this);
    }
  }

  protected addChild = (route: BaseRoute) => {
    this.children.push(route);
  };

  public urlPattern = (): string => {
    const parentLink = this.parent ? this.parent.urlPattern() : "";
    let ret =
      parentLink +
      (parentLink[parentLink.length - 1] === "/" ? "" : "/") +
      this.path;
    if (ret[ret.length - 1] === "/" && ret.length > 1) {
      ret = ret.substring(0, ret.length - 1);
    }
    return ret;
  };

  public link = (parameters: IURLParameters = {}): string => {
    return buildUrl(this.urlPattern(), parameters);
  };

  public getRedirectRoute = (parameters: IURLParameters = {}): string => {
    return this.link(parameters);
  };

  public params = () => {
    const { location } = window;
    const { href } = location;
    const urlPattern = this.urlPattern();
    const urlParams = urlPattern.match(/(:[^/]*)/g);

    if (urlParams) {
      const urlParamRegex = "([^\\/]*)";
      const urlParamPlaceHolder = "urlParamPlaceHolder";
      const urlPatternRegex = urlParams
        .reduce(
          (acc, value) => acc.replace(value, urlParamPlaceHolder),
          urlPattern
        )
        .replace(/\//g, "\\/")
        .replace(new RegExp(urlParamPlaceHolder, "g"), urlParamRegex);

      const urlParamsValues = href.match(new RegExp(urlPatternRegex));
      if (urlParamsValues) {
        return urlParams.reduce((acc: any, value, index) => {
          const key = value.replace(":", "");
          acc[key] = urlParamsValues[index + 1];
          return acc;
        }, {});
      }
    }
    return {};
  };

  public asReactRouterDomElement(): JSX.Element {
    console.log(this.path);
    if (!this.children) {
      return (
        <Route
          key={this.urlPattern()}
          path={this.path}
          element={
            !!this.component ? (
              <NavigationRegistry route={this} params={this.params()}>
                <this.component />
              </NavigationRegistry>
            ) : undefined
          }
          errorElement={<ErrorPage />}
        />
      );
    } else {
      return (
        <Route
          key={this.urlPattern()}
          path={this.path}
          element={
            !!this.component ? (
              <NavigationRegistry route={this} params={this.params()}>
                <this.component />
              </NavigationRegistry>
            ) : undefined
          }
          errorElement={<ErrorPage />}
        >
          {this.children.map((child) => child.asReactRouterDomElement())}{" "}
        </Route>
      );
    }
  }
}

export default BaseRoute;
