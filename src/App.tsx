import { Fragment } from "react";
import "./App.css";
import Header from "./components/header/Header";
import Menu from "./components/menu/Menu";
import "bootstrap/dist/css/bootstrap.css";
import RouteRenderer from "./components/routers/RouteRender";

function App() {
  return <RouteRenderer />;
}

export default App;
