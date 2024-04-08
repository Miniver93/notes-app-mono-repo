/* eslint-disable react/prop-types */
import React, {useState, useEffect} from "react";
import Togglable from "./Togglable";
import loginService from '../services/login'
import noteService from '../services/notes'
import PropTypes from 'prop-types'

const LoginForm = ({ user, setErrorMessage, setUser}) => {
	

	useEffect(() => {
		//Recuperamos el json del usuario logeado de nuestro localstorage
		const loggedUserJson = window.localStorage.getItem("loggedNoteAppUser");
		if (loggedUserJson) {
			//Recuperamos el usuario del json parseandolo a object
			const userObject = JSON.parse(loggedUserJson);
			//Y guardamos el usuario en nuestro estado usuario para tener la inición iniciada mientras exista nuestro archivo localstorage
			setUser(userObject);
			//Además guardamos el token de nuestro localstorage
			noteService.setToken(userObject.token);
		}
	}, []);

	const [credentials, setCredentials] = useState({
		username: '',
		password: ''
	})

	const handleChange = (event) => {
		const {name, value} = event.target
		setCredentials({
			...credentials,
			[name]:value
		})
	}

	const handleLogin = async (event) => {
		event.preventDefault();

		try {
			//Guardamos el objeto con el username y el password en userObject
			const userObject = await loginService.login({
				username: credentials.username,
				password: credentials.password
			});
			//Para que la sesión dure incluso si actualizamos la página, tenemos que guardar el token de usuario en localStorage
			window.localStorage.setItem(
				"loggedNoteAppUser",
				JSON.stringify(userObject) //Esto es key valor, nombre de key valor de key
			);
			//Una vez que logueemos nos guardará el token del usuario en noteService.setToken
			noteService.setToken(userObject.token);
			setUser(userObject);
			setCredentials({...credentials, username: '', password: ''})
		} catch (error) {
			setErrorMessage("Wrong credentials", error);
			setTimeout(() => {
				setErrorMessage(null);
			}, 4000);
		}
	};

	
	const handleLogout = () => {
		window.localStorage.removeItem("loggedNoteAppUser");
		noteService.setToken(null);
		setUser(null);
	};

	return (
		<div>
			{!user && (
				<Togglable buttonLabelShow={"Show login"} buttonLabelHide={'Cancel'}>
					<form id="login_form" onSubmit={handleLogin}>
						<h2>Login</h2>
						<div>
							<label htmlFor="username">Username</label>
							<input
								autoComplete="username"
								type="text"
								name="username"
								id="username"
								placeholder="Username"
								value={credentials.username}
								onChange={handleChange}
							/>
						</div>

						<div>
							<label htmlFor="password">Password</label>
							<input
								autoComplete="current-password"
								type="password"
								name="password"
								id="password"
								placeholder="Password"
								value={credentials.password}
								onChange={handleChange}
							/>
						</div>

						<button type="submit">Login</button>
					</form>
				</Togglable>
			)}

			{user && (
				<div>
					<button onClick={handleLogout}>Logout</button>
				</div>
			)}
		</div>
	);
};

LoginForm.prototype = {
	handleLogin: PropTypes.func.isRequired,
	username: PropTypes.string.isRequired
}

export default LoginForm;