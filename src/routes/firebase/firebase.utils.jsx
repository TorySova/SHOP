import { initializeApp } from 'firebase/app'
import { 
	getAuth,
	signInWithRedirect,
	signInWithPopup,
	GoogleAuthProvider 
} from 'firebase/auth'

import {
	getFirestore,
	doc,
	getDoc,
	setDoc
} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyBNrxImemaogRzV7nVUVl7ZqUAAodoZy4g",
	authDomain: "crwn-app-807e9.firebaseapp.com",
	projectId: "crwn-app-807e9",
	storageBucket: "crwn-app-807e9.appspot.com",
	messagingSenderId: "674102378045",
	appId: "1:674102378045:web:02fd156a716d0b21fef454"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider()

  provider.setCustomParameters({
	prompt: 'select_account'
  })

  export const auth = getAuth()
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

  export const db = getFirestore()

  export const createUserDocFromAuth = async (userAuth) => {
	const userDocRef = doc(db, 'users', userAuth.uid)

	console.log('userDocRef', userDocRef);

	const userSnapshot = await getDoc(userDocRef)
	console.log('userSnapshot', userSnapshot);
	console.log( userSnapshot.exists());

	if (!userSnapshot.exists()) {
		const { displayName, email } = userAuth
		const createAt = new Date();

		try {
			await setDoc(userDocRef, {
				displayName,
				email,
				createAt
			})
		}
		catch (error) {
			console.log('error creating the user', error.message);
		}
	}

	return userDocRef
  }