import { useContext } from 'react'
import Button from '../button/button.component'
import './cart-dropdown.styles.scss'
import { CatrContext } from '../../contexts/cart.context'
import CartItem from '../cart-item/cart-item'
import { useNavigate } from 'react-router-dom'


const CardDropdown = () => {

	const {cartItems} = useContext(CatrContext)
	const navigate = useNavigate()

	const goToCheckoutHandler = () => {
		navigate('/checkout')
	}

	return (
		<div className='cart-dropdown-container'>
			<div className='cart-items'>
				{cartItems.map((item) => <CartItem cartItem={item} key={item.id}/>)}
			</div>
			<Button onClick={goToCheckoutHandler}>Go</Button>
			
		</div>
	)
}

export default CardDropdown