import { useLocalStore } from "mobx-react-lite";
import React from "react";
import { ProductStore } from "./ProductStore";
import { OrderStore } from "./OrderStore";
import { UiStore } from "./UiStore";
import RootRouter from "../components/routers/application-routes/RootRouter";

export const createWidgetStore = () => ({
  router: RootRouter,
  productStore: new ProductStore(),
  orderStore: new OrderStore(),
  ui: new UiStore(),
});

export type TStore = ReturnType<typeof createWidgetStore>;

export const StoreContext = React.createContext<TStore | null>(null);

export const StoreProvider = ({ children }: { children: any }) => {
  const store = useLocalStore(createWidgetStore);
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

export const useStore = (): TStore => {
  const store = React.useContext(StoreContext);
  if (!store) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return store;
};
