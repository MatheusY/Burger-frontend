import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import route from "./application-routes/RootRouter";
import { useStore } from "../../store/MainStore";
import { useObserver } from "mobx-react-lite";

const RouteRenderer = () => {
  return (
    <RouterProvider
      router={createBrowserRouter(
        createRoutesFromElements(route.asReactRouterDomElement())
      )}
    />
  );
};

export const RouteRedirector = () => {
  const { ui } = useStore();
  return useObserver(() => {
    if (ui.redirectToUrl) {
      return <Navigate to={ui.redirectToUrl || "/"} />;
    }
    return null;
  });
};

export default RouteRenderer;
