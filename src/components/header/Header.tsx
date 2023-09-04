import styles from "./Header.module.css";
import HeaderOrder from "./HeaderOrder";
import { RouteRedirector } from "../routers/RouteRender";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useStore } from "../../store/MainStore";
import { observer } from "mobx-react-lite";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment } from "react";

const Header = ({
  onMenu,
  onUser,
}: {
  onMenu: () => void;
  onUser: () => void;
}) => {
  // const navigate = useNavigate();
  // const location = useLocation();
  // const { router } = useStore();
  // const {var} = useParams();
  return (
    <Fragment>
      <header className={styles.header}>
        <h1>Coma bem</h1>
        <div className={styles.right_side}>
          <nav
            className={`navbar navbar-toggleable navbar-expand-lg ${styles.navbar}`}
          >
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav">
                <li className="nav-item active">
                  <button
                    className={`nav-link ${styles.navbar_item}`}
                    onClick={onMenu}
                  >
                    Menu
                  </button>
                </li>
              </ul>
            </div>
          </nav>
          <div>
            <HeaderOrder />
          </div>
          <div>
            <FontAwesomeIcon icon="user-circle" size="3x" onClick={onUser} />
          </div>
        </div>
      </header>
      <Outlet />
      <RouteRedirector />
    </Fragment>
  );
};

export default observer(() => {
  const navigate = useNavigate();
  const location = useLocation();
  const { router, userStore } = useStore();
  const { user } = userStore;

  const handleMenu = () => {
    navigate(router.indexRoute.getRedirectRoute());
  };

  const handleUser = () => {
    navigate(router.user.indexRoute.getRedirectRoute({ userId: user?.id }));
  };

  return <Header onMenu={handleMenu} onUser={handleUser} />;
});
