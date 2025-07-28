import { createContext } from "react";

const UserDataContext = createContext({
  userData: null,
  isLoading: true,
});

export default UserDataContext;
