import { useState, useContext } from "react"
import { createAuthUserWithEmailAndPassword, createUserDocFromAuth, signInAuthUserWithEmailAndPassword, signInWithGooglePopup } from "../../routes/firebase/firebase.utils"
import FormInput from "../form-input/form-input.component"


import Button from "../button/button.component"

import './sign-in-form.styles.scss'

const defaultFormFields = {
	email: '',
	password: '',
}

const SignInForm = () => {

	const [formFields, setFormFields] = useState(defaultFormFields)
	const {email, password} = formFields

	const handleChange = (event) => {
		const {name, value} = event.target

		setFormFields({...formFields, [name]: value})
	}

	const resetFormFields = () => {
		setFormFields(defaultFormFields)
	}

	const signInGoogle = async () => {
		await signInWithGooglePopup()
	}

	const handleSubmit = async (event) => {
		event.preventDefault()
		try{
			await signInAuthUserWithEmailAndPassword(email, password)
			resetFormFields()

		} catch(error) {
			if (error.code === 'auth/invalid-credential'){
				alert('incorrect password or email')
			}
			console.log(error);
		}
	}

	return (
		<div className="sign-in-container">
			<h2>Already have an account?</h2>
			<span>Sing In wiht email</span>
			<form onSubmit={handleSubmit}>

				<FormInput 
					label='Email'
					type='email'
					required
					onChange={handleChange}
					name='email'
					value={email}
				/>

				<FormInput 
					label='Password'
					type='password'
					required
					onChange={handleChange}
					name='password'
					value={password}
				/>
				<div className="buttons-container">

					<Button type='submit'>Sign In</Button>
					<Button type='button' buttonType='google' onClick={signInGoogle}> Google Sign In</Button>
				</div>
			</form>
		</div>
	)
}

export default SignInForm
