// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD1rY1gU_S_nR7sv_7qHG6_frLbJLmdOwI",
  authDomain: "foodcorner-2c2d7.firebaseapp.com",
  projectId: "foodcorner-2c2d7",
  storageBucket: "foodcorner-2c2d7.appspot.com",
  messagingSenderId: "987350574607",
  appId: "1:987350574607:web:cb63d1343cd5a048b9257a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app)
export default auth