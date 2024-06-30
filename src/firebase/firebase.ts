// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, RecaptchaVerifier } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBinBFjwy2Yxhd0tdOAWBJIoMiil8W7HVA",
  authDomain: "agri-app-9bf66.firebaseapp.com",
  projectId: "agri-app-9bf66",
  storageBucket: "agri-app-9bf66.appspot.com",
  messagingSenderId: "617605403940",
  appId: "1:617605403940:web:ffad2e3e67e467edef8fb1",
  measurementId: "G-5X9Q66XS53"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const createRecaptchaVerifier = () => {
  return new RecaptchaVerifier(auth, 'recaptcha-container', {
    size: 'invisible',
    callback: () => {
      // reCAPTCHA solved, allow signInWithPhoneNumber.
      console.log("reCAPTCHA solved, allow signInWithPhoneNumber.");
    },
    'expired-callback': () => {
      // Response expired. Ask user to solve reCAPTCHA again.
      console.log("Response expired. Ask user to solve reCAPTCHA again.");
    }
  });  // Pass the `auth` object as the third parameter
};


export { app, auth, db, createRecaptchaVerifier };