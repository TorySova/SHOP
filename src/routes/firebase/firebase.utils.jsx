import { initializeApp } from 'firebase/app'
import { 
	getAuth,
	signInWithRedirect,
	signInWithPopup,
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged
} from 'firebase/auth'

import {
	getFirestore,
	doc,
	getDoc,
	setDoc,
	collection,
	writeBatch,
	query,
	getDocs
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
  export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider)

  export const db = getFirestore()

  export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
	const collectionRef = collection(db, collectionKey)
	const batch = writeBatch(db)

	objectsToAdd.forEach((object) => {
		const docRef = doc(collectionRef, object.title.toLowerCase())
		batch.set(docRef, object)
	})

	await batch.commit()
	console.log('done');

  }

  export const getCategoriesAndDocuments = async () => {
	const collectionRef = collection(db, 'categories')
	const q = query(collectionRef)

	const querySnapshot = await getDocs(q)
	const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
		const {title, items} = docSnapshot.data()
		acc[title.toLowerCase()] = items
		return acc
	}, {})

	return categoryMap
  }

  export const createUserDocFromAuth = async (userAuth, additionalInfo={}) => {
	const userDocRef = doc(db, 'users', userAuth.uid)

	const userSnapshot = await getDoc(userDocRef)

	if (!userSnapshot.exists()) {
		const { displayName, email } = userAuth
		const createAt = new Date();

		try {
			await setDoc(userDocRef, {
				displayName,
				email,
				createAt,
				...additionalInfo
			})
		}
		catch (error) {
			console.log('error creating the user', error.message);
		}
	}

	return userDocRef
  }

  export const createAuthUserWithEmailAndPassword = async (email, password) => {
	if(!email || !password) return
	return await createUserWithEmailAndPassword(auth, email, password)
  }

  export const signInAuthUserWithEmailAndPassword = async (email, password) => {
	if(!email || !password) return
	return await signInWithEmailAndPassword(auth, email, password)
  }

  export const signOutUser = async () => await signOut(auth)

  export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback)
