import { useCallback, useState } from "react";
import { db } from ".././components/Firebase.jsx";
import { doc, getDoc, updateDoc } from "firebase/firestore";

function useUserData(initialState = null) {
  const [user, setUser] = useState(initialState);

  const getUserData = useCallback(async () => {
    try {
      const docSnap = await getDoc(doc(db, "Users", user?.uid));
      console.log("User data retrieved successfully.");
      return docSnap.data();
    } catch (error) {
      console.log(error.message);
    }
  }, [user]);

  const updateUserData = useCallback(
    async (updatedAttributes) => {
      try {
        await updateDoc(doc(db, "Users", user?.uid), updatedAttributes);
        console.log("User data update successful.");
      } catch (error) {
        console.log(error.message);
      }
    },
    [user?.uid],
  );

  return [user, setUser, getUserData, updateUserData];
}

export default useUserData;
