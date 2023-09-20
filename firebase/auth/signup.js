import firebase_app from "../config";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import addData from "../firestore/addData";

const auth = getAuth(firebase_app);

export default async function signUp(email, password) {
  let add = null;
  let result = null,
    error = null;
  try {
    result = await createUserWithEmailAndPassword(auth, email, password);
  } catch (e) {
    error = e;
  }

  return { result, error };
}
