import { Fragment, useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';

import './navigation.styles.scss'
import { UserContext } from '../../contexts/user.contexts';
import { signOutUser } from '../firebase/firebase.utils';
import CartIcon from '../../components/cart-icon/cart-icon';
import CardDropdown from '../../components/cart-dropdown/cart-dropdown';
import { CatrContext } from '../../contexts/cart.context';

const Navigation = () => {

	const {currentUser} = useContext(UserContext)
	const {isCartOpen} = useContext(CatrContext)

	console.log('currentUser', currentUser);
	return (
	  <Fragment>
		<div className='navigation'>
			<Link className='logo-container' to='/'>
				<CrwnLogo className='logo'/>
			</Link>
			<div className='nav-links-container'>
				<Link className='nav-link' to='/shop'>
					SHOP
				</Link>
				{ currentUser 
					? <span className='nav-link' onClick={signOutUser}>Log Out</span>
					: <Link className='nav-link' to='/auth'>
						SIGN-IN
					</Link>
				}
				<CartIcon/>
			</div> 
			{isCartOpen && <CardDropdown/>}
		</div>
		<Outlet/>
	  </Fragment>
	)
}

export default Navigation
