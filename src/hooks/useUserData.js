import { useContext } from "react";
import UserDataContext from "../contexts/UserDataContext.js";

export const useUserData = () => {
  return useContext(UserDataContext);
};
