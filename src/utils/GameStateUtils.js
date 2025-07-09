import { doc, updateDoc } from "firebase/firestore";
import { db, auth } from "../components/Firebase.jsx";

export async function updateGameState(guesses, rowIndex, keyColors) {
  const docRef = doc(db, "Users", auth.currentUser.uid);
  try {
    await updateDoc(docRef, {
      "statistics.gameModes.classicGM.playedToday": true,
      "statistics.gameModes.classicGM.currentState.guesses": guesses,
      "statistics.gameModes.classicGM.currentState.keyColors":
        Object.fromEntries(keyColors),
      "statistics.gameModes.classicGM.currentState.rowIndex": rowIndex,
    });
    console.log("User data updated.");
  } catch (e) {
    console.log(e.message);
  }
}
