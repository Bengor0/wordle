import { createContext } from "react";

const AuthContext = createContext({
  currentUser: null,
  loading: true,
});

export default AuthContext;
