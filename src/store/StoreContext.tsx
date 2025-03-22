import React from "react";
import { userStore } from "@/store/User";

export const StoreContext = React.createContext(userStore);
export const useStore = () => React.useContext(StoreContext);
