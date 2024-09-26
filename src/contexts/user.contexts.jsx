import { createContext, useState, useEffect } from "react";
import { createUserDocFromAuth, onAuthStateChangedListener } from "../routes/firebase/firebase.utils";

export const UserContext = createContext({
	currentUser: null,
	setCurrentUser: () => null,
})

export const UserProvider = ({children}) => {
	const [currentUser, setCurrentUser] = useState(null)
	const value = {currentUser, setCurrentUser}

	useEffect(() => {
		const unsubscibe = onAuthStateChangedListener((user) => {
			if(user) {
				createUserDocFromAuth(user)
			}
			setCurrentUser(user)
			console.log('user', user);
		})
		return unsubscibe
	}, [])

	return <UserContext.Provider value={value}>
		{children}
	</UserContext.Provider>
}