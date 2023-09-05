import { observer } from "mobx-react-lite";
import { useStore } from "../../../store/MainStore";
import { IUser } from "../../../models/User";
import styles from "./UserInfo.module.css";
import { useNavigate, useParams } from "react-router-dom";

const UserInfo = ({ user, onEdit }: { user?: IUser; onEdit: () => void }) => {
  return (
    <div className={styles.body}>
      <div className={styles.data}>
        <label>
          <b>Nome</b>
        </label>
        <label>{user?.name}</label>
        <button
          type="submit"
          className={`btn btn-primary ${styles.edit}`}
          onClick={onEdit}
        >
          Editar
        </button>
      </div>
    </div>
  );
};

export default observer(() => {
  const navigate = useNavigate();
  const { userStore, router } = useStore();
  const { user, getUser } = userStore;
  const { userId } = useParams();

  if (!user || user.id !== Number(userId)) {
    getUser(Number(userId));
    if (!user) {
      navigate(router.indexRoute.getRedirectRoute({}));
      return <></>;
    }
  }

  const handleEdit = () => {
    navigate(router.user.edit.getRedirectRoute({ userId: user?.id }));
  };
  return <UserInfo user={user} onEdit={handleEdit} />;
});
