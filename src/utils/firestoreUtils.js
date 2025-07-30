import {
  doc,
  getDoc,
  updateDoc,
  collection,
  getDocs,
} from "firebase/firestore";
import { db } from "../components/Firebase.jsx";

export async function fetchUserData(uid) {
  try {
    const docRef = doc(db, "Users", uid);
    const docSnap = await getDoc(docRef);
    console.log("User data fetched.");
    return docSnap.data();
  } catch (e) {
    console.error(e);
  }
}

export async function fetchAllUsers() {
  try {
    const collRef = collection(db, "Users");
    const collSnap = await getDocs(collRef);
    console.log("All users fetched");
    return collSnap;
  } catch (e) {
    console.error(e);
  }
}

export async function updateUserData(uid, newData) {
  try {
    const docRef = doc(db, "Users", uid);
    await updateDoc(docRef, newData);
    console.log("User data updated.");
  } catch (e) {
    console.error(e);
  }
}
