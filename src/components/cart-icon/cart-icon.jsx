import { useContext } from 'react'
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg'
import { CatrContext } from '../../contexts/cart.context'

import './cart-icon.styles.scss'

const CartIcon = () => {
	const {isCartOpen, setIsCartOpen, cartCount} = useContext(CatrContext)

	const toggleIsCartOpen = () => {
		setIsCartOpen(!isCartOpen)
	}
	return (
		<div className='cart-icon-container' onClick={toggleIsCartOpen}>
			<ShoppingIcon className='shopping-icon'/>
			<span className='item-count'>{cartCount}</span>
		</div>
	)
}

export default CartIcon