import { useStore } from "../../../store/MainStore";
import BaseRoute from "./BaseRoute";

const NavigationRegistry = ({
  children,
  route,
  params,
}: {
  children: any;
  route: BaseRoute;
  params: any;
}) => {
  const { ui } = useStore();
  ui.onRoute(route, params);
  return children;
};

export default NavigationRegistry;
