import { observer } from "mobx-react-lite";

const UserInfo = () => {
  return <div>Usuario: Matheus</div>;
};

export default observer(() => {
  return <UserInfo />;
});
