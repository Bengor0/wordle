import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../components/Firebase.jsx";

export async function fetchUserData(uid) {
  const docRef = doc(db, "Users", uid);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) {
    throw new Error(`User "${uid}" has no existing document.`);
  }
  console.log("User data fetched.");
  return docSnap.data();
}

export async function updateUserData(uid, newData) {
  const docRef = doc(db, "Users", uid);
  await updateDoc(docRef, newData);
  console.log("User data updated.");
}
