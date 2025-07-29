import React from "react";
import UserDataContext from "../../contexts/UserDataContext.js";
import { useQuery } from "@tanstack/react-query";
import { fetchUserData } from "../../utils/firestoreUtils.js";
import { useAuth } from "../../hooks/useAuth.js";

function UserDataProvider({ children }) {
  const { currentUser, loading } = useAuth();
  const { data: userData, isLoading } = useQuery({
    queryKey: ["user", currentUser?.uid],
    queryFn: ({ queryKey }) => {
      const [, uid] = queryKey;
      return fetchUserData(uid);
    },
    enabled: !!currentUser && !loading,
  });

  const value = {
    userData: userData,
    isLoading: isLoading,
  };

  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
}

export default UserDataProvider;
