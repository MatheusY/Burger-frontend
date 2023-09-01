import { Fragment } from "react";
import styles from "./Header.module.css";
import HeaderOrder from "./HeaderOrder";
import { RouteRedirector } from "../routers/RouteRender";
import {
  Navigate,
  NavigateFunction,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useStore } from "../../store/MainStore";
import { observer } from "mobx-react-lite";
import { RootRouter } from "../routers/application-routes/RootRouter";

const Header = ({
  router,
  navigate,
}: {
  router: RootRouter;
  navigate: NavigateFunction;
}) => {
  // const navigate = useNavigate();
  // const location = useLocation();
  // const { router } = useStore();
  // const {var} = useParams();
  const handleUser = () => {
    navigate(router.user.userInfo.getRedirectRoute({ userId: 1 }));
  };
  return (
    <>
      <header className={styles.header}>
        <h1>Coma bem</h1>
        <div>
          <HeaderOrder />
          <div onClick={handleUser}>User</div>
        </div>
      </header>
      <Outlet />
      <RouteRedirector />
    </>
  );
};

export default observer(() => {
  const navigate = useNavigate();
  const location = useLocation();
  const { router } = useStore();
  return <Header router={router} navigate={navigate} />;
});
