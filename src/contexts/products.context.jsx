import { createContext, useState, useEffect } from "react";

import { getCategoriesAndDocuments } from "../routes/firebase/firebase.utils";

export const ProductsContext = createContext({
	products: []
})

export const ProductsProvider = ({children}) => {
	const [products, setProducts] = useState([])

	useEffect(() => {
		const getCategoriesMap = async () => {
			const categoryMap = await getCategoriesAndDocuments()
			console.log('categoryMap', categoryMap);
		}
		getCategoriesMap()
	}, [])
	const value = {products}
	return (
		<ProductsContext.Provider value={value}>
			{children}
		</ProductsContext.Provider>
	)
}