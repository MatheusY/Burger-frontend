import { Fragment } from "react";
import "./App.css";
import Header from "./components/header/Header";
import Menu from "./components/menu/Menu";
import "bootstrap/dist/css/bootstrap.css";

function App() {
  return (
    <Fragment>
      <Header />
      <Menu />
    </Fragment>
  );
}

export default App;
