import { doc, getDoc } from "firebase/firestore";
import { db } from "../components/Firebase.jsx";

export async function getClassicWord() {
  try {
    const data = await getData("dailyWords");
    return data.classicWord;
  } catch (e) {
    console.log(e.message);
  }
}

export async function getRoyaleWords() {
  try {
    const data = await getData("dailyWords");
    return data.royaleWords;
  } catch (e) {
    console.log(e.message);
  }
}

export async function getWordBank() {
  try {
    const data = await getData("wordBank");
    return data.allWords;
  } catch (e) {
    console.log(e.message);
  }
}

async function getData(document) {
  try {
    const docRef = doc(db, "wordleWords", document);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
  } catch (e) {
    console.log(e.message);
  }
}
