//El hook useImperativeHandle es para definir funciones dentro de un componente y después invocar estas funciones en otro componente. El hook forwardRef sirve par hacer referencias de componentes
import React, {useState, useImperativeHandle, forwardRef} from "react";
import PropTypes from 'prop-types'


//Con este componente podemos renderizar dentro de él lo que queramos cuando lo llamemos
// eslint-disable-next-line react/prop-types
const Togglable = forwardRef(({children, buttonLabelShow, buttonLabelHide}, ref) => {
	const [visible, setVisible] = useState(false)

	//Esto es diferente al renderizado condicional, aquí muestro o oculto un componente que está en el html, en cambio de la otra manera lo que hago es renderizar uno u otro
	const hideWhenVisible = { display: visible ? 'none' : ''}
	const showWhenVisible = { display: visible ? '' : 'none'}
	
	//Si es tre lo cambiamos a false y si es false a true
	const toggleVisibility = () => setVisible(!visible)

	//Lo que haríamos aquí es guardar la función en un objeto en ref, que esto luego nos serviría para ejecutar la función que queramos dentro de estos métodos
	useImperativeHandle(ref, () =>{
		return {
			toggleVisibility
		}
	})

	return (
		<div>
			<div style={hideWhenVisible}>
				<button onClick={toggleVisibility}>{buttonLabelShow}</button>
			</div>

			<div style={showWhenVisible}>
				{/* Con esto, cuando visible sea true, se mostrará el botón hide y además el children, el componente LoginForm que le hemos agregado a este */}
				{children}
				<button onClick={toggleVisibility}>{buttonLabelHide}</button>
			</div>

		</div>
	)
    
})
//Le cambio los tipos de mi componente togglable
Togglable.propTypes = {
	buttonLabelWhenVisible: PropTypes.string,
	buttonLabelWhenHidden: PropTypes.string
}

Togglable.displayName = 'Togglable'
export default Togglable