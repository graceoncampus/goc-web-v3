import React from "react";
import { userStore } from "./User"; // Adjust path

export const StoreContext = React.createContext(userStore);

export const useStore = () => React.useContext(StoreContext); //
