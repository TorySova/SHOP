import { createContext, useEffect, useState } from "react";

const addCartItem = (cartItems, productToAdd)  => {
	const existingCatrItem = cartItems.find(
		(cartItem) => cartItem.id === productToAdd.id
	)

	if(existingCatrItem) {
		return cartItems.map((cartItem) => cartItem.id === productToAdd.id
			? {...cartItem, quantity: cartItem.quantity + 1}
			: cartItem
		)
	}

	return [...cartItems, {...productToAdd, quantity: 1}]
}

const removeCartItem = (cartItems, cartItemToRemove)  => {
	const existingCatrItem = cartItems.find(
		(cartItem) => cartItem.id === cartItemToRemove.id
	)

	if(existingCatrItem.quantity === 1) {
		return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id)
	}

	return cartItems.map((cartItem) => cartItem.id === cartItemToRemove.id
		? {...cartItem, quantity: cartItem.quantity - 1}
		: cartItem
)
}

const clearCartItem = (cartItems, cartItemToClear) => {
	return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id)
}

export const CatrContext = createContext({
	isCartOpen: false,
	setIsCartOpen: () => {},
	cartItems: [],
	addItemToCart: () => {},
	cartCount: 0,
	cartTotal: 0,
	removeItemToCart: () => {},
	clearItemFromCart: () => {}
});


export const CartProvider = ({ children }) => {
	const [isCartOpen, setIsCartOpen] = useState(false)
	const [cartItems, setCartItems] = useState([])
	const [cartCount, setCartCount] = useState(0)
	const [cartTotal, setCartTotal] = useState(0)

	useEffect(() => {
		const newCartItems = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
		setCartCount(newCartItems)

	}, [cartItems])
	useEffect(() => {
		const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0)
		setCartTotal(newCartTotal)

	}, [cartItems])

	const addItemToCart = (productToAdd) => {
		setCartItems(addCartItem(cartItems, productToAdd))
	}
	const removeItemToCart = (cartItemToRemove) => {
		setCartItems(removeCartItem(cartItems, cartItemToRemove))
	}
	const clearItemFromCart = (cartItemToClear) => {
		setCartItems(clearCartItem(cartItems, cartItemToClear))
	}

	const value = {isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount, removeItemToCart, clearItemFromCart, cartTotal}

	return <CatrContext.Provider value={value}>{children}</CatrContext.Provider>
}