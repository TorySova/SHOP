import { useContext } from 'react'
import Button from '../button/button.component'
import './product-card.styles.scss'
import { CatrContext } from '../../contexts/cart.context'


const ProductCard = ({product}) => {
	const { name, price, imageUrl } = product

	const {addItemToCart} = useContext(CatrContext)

	const addProductToCart = () => {
		addItemToCart(product)
	}

	return (
		<div className='product-card-container'>
			<img src={imageUrl} alt={`${name}`}/>
			<div className='footer'>
				<span className='name'>{name}</span>
				<span className='price'>{price}</span>
			</div>
			<Button buttonType={'inverted'} onClick={addProductToCart}>Add to card</Button>
		</div>
	)
}
export default ProductCard