import React, { useEffect, useState } from "react";
import { auth } from "../Firebase.jsx";
import { onAuthStateChanged } from "firebase/auth";
import AuthContext from "../../contexts/AuthContext.js";
import WordleLoader from "../WordleLoader.jsx";

function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = {
    currentUser,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading ? (
        children
      ) : (
        <div>
          <h1>Loading Wordle...</h1>
          <WordleLoader />
        </div>
      )}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
