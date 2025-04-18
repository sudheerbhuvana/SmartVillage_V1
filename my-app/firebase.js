import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDgIAmtwhP2-ueLGLFdnzxf6dSqbNDi_3s",
    authDomain: "svrwebsite-1e892.firebaseapp.com",
    projectId: "svrwebsite-1e892",
    storageBucket: "svrwebsite-1e892.appspot.com",
    messagingSenderId: "1052767840242",
    appId: "1:1052767840242:web:642be276cee4eeb9f32d6b"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
