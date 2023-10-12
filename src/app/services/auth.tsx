import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import { initializeApp } from "firebase/app";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: "AIzaSyDTJBqOrXYSRxxGBuj2aWPBLqYS3GDM0Oc",
  authDomain: "winwingo-firebase.firebaseapp.com",
  projectId: "winwingo-firebase",
  storageBucket: "winwingo-firebase.appspot.com",
  messagingSenderId: "606419034082",
  appId: "1:606419034082:web:814ec5acd5bf36a23723bb",
};

const app = initializeApp(firebaseConfig);

export const getFirebaseAppAuth = () => {
  return getAuth(initializeApp(firebaseConfig));
};

export const useAuthService = () => {
  let currentUserTokenId = "";

  const singInUser = async (email: string, pwd: string): Promise<string> => {
    const auth = getAuth(app);
    const fbUserInfo = await signInWithEmailAndPassword(auth, email, pwd);

    currentUserTokenId = await fbUserInfo.user.getIdToken();

    return currentUserTokenId;
  };

  return {
    singInUser,
    logOutUser: () => {
      getAuth(app).signOut();
    },
  };
};
