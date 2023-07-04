import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC91rffnoM1s0mhbt29jS1x_zCaIpyhURk",
  authDomain: "vibe-check-773b3.firebaseapp.com",
  projectId: "vibe-check-773b3",
  storageBucket: "vibe-check-773b3.appspot.com",
  messagingSenderId: "186071599878",
  appId: "1:186071599878:web:0760c05705a91671fd2c87",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
