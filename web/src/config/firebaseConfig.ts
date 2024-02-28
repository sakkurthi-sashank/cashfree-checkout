import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBvzASnIhXQDJLNdqucGeXZh0OKkUvx58s",
  authDomain: "infinitus-payments.firebaseapp.com",
  projectId: "infinitus-payments",
  storageBucket: "infinitus-payments.appspot.com",
  messagingSenderId: "128161623897",
  appId: "1:128161623897:web:fb7bcc2582c07038446648",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
