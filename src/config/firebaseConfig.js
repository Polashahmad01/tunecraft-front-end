import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBJgBbC8aVlSJG-CpqH2emK7NeP-Shvx4w",
  authDomain: "tunecraft.firebaseapp.com",
  projectId: "tunecraft",
  storageBucket: "tunecraft.appspot.com",
  messagingSenderId: "211964724652",
  appId: "1:211964724652:web:0f72d59eccce82de5e2609"
}

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
