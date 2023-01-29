import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { getFirebaseEnvVars } from "../util/envVars";

const firebaseConfig = getFirebaseEnvVars();
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
