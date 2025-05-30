import React from "react";
import CatalogStore from "../store/CatalogStore.js";
import UserStore from "../store/UserStore.js";
import BasketStore from "../store/BasketStore.js";

export const AppContext = React.createContext();

const context = {
  user: new UserStore(),
  catalog: new CatalogStore(),
  basket: new BasketStore(),
};

export const AppContextProvider = (props) => {
  return (
    <AppContext.Provider value={context}>{props.children}</AppContext.Provider>
  );
};
