import { useLocalStore } from "mobx-react-lite";
import React from "react";
import { ProductStore } from "./ProductStore";
import { CartStore } from "./CartStore";

export const createWidgetStore = () => ({
  productStore: new ProductStore(),
  cartStore: new CartStore(),
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
