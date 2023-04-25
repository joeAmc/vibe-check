import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC91rffnoM1s0mhbt29jS1x_zCaIpyhURk",
  authDomain: "vibe-check-773b3.firebaseapp.com",
  projectId: "vibe-check-773b3",
  storageBucket: "vibe-check-773b3.appspot.com",
  messagingSenderId: "186071599878",
  appId: "1:186071599878:web:0760c05705a91671fd2c87",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
