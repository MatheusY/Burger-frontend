import { observer } from "mobx-react-lite";
import { useStore } from "../../store/MainStore";
import { IUser } from "../../models/User";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./UserEdit.module.css";
import useInput from "../hooks/UseInput";

const UserEdit = ({
  user,
  onEdit,
}: {
  user: IUser;
  onEdit: (user: IUser) => void;
}) => {
  const [formIsValid, setFormIsValid] = useState(false);

  const {
    value: name,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    valueBlurHandler: nameBlurHandlder,
  } = useInput({
    initialValue: user.name,
    validateValue: (name: string) => name.trim() !== "",
  });

  useEffect(() => {
    setFormIsValid(nameIsValid);
  }, [setFormIsValid, nameIsValid]);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    user.name = name;
    onEdit(user);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="nomeInput" className="form-label">
          Nome
        </label>
        <input
          type="text"
          className={`form-control ${styles.input}`}
          id="nomeInput"
          placeholder="Digite o nome"
          maxLength={100}
          value={name}
          onChange={nameChangeHandler}
          onBlur={nameBlurHandlder}
        />
        {nameHasError && (
          <p className={styles.error_text}>Nome é obrigatório</p>
        )}
      </div>
      <button
        type="submit"
        disabled={!formIsValid}
        className={`btn btn-primary ${styles.submit}`}
      >
        Salvar
      </button>
    </form>
  );
};

export default observer(() => {
  const navigate = useNavigate();
  const { userStore, router } = useStore();
  const { user, updateUser, getUser } = userStore;
  const { userId } = useParams();

  if (!user || user.id !== Number(userId)) {
    getUser(Number(userId));
    if (!user) {
      navigate(router.indexRoute.getRedirectRoute({}));
      return <></>;
    }
  }

  const handleEdit = (user: IUser): void => {
    updateUser(user).then(() =>
      navigate(router.user.indexRoute.getRedirectRoute({ userId: user.id }))
    );
  };

  return <UserEdit user={user} onEdit={handleEdit} />;
});
