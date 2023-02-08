import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { collection, addDoc } from "firebase/firestore"; 

//Should probably obfuscate this
const firebaseConfig = {
  apiKey: "AIzaSyCbjnYDINmQYpW0MftlE0yqllpQ9NVw2W4",
  authDomain: "runappfirebase.firebaseapp.com",
  projectId: "runappfirebase",
  storageBucket: "runappfirebase.appspot.com",
  messagingSenderId: "717926265088",
  appId: "1:717926265088:web:6359445b027b6e50d543e5",
  measurementId: "G-G2CEXKK8BL"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore();

export async function sendDataToFirebase(data) {
    await addDoc(collection(db, "activities"), data);  
}
