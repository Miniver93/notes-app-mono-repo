/* eslint-disable no-undef */
import React from 'react'
import '@testing-library/jest-dom'
import {render, fireEvent, } from '@testing-library/react'
import '@jest/globals'
import Togglable from './Togglable'

describe('<Togglable>', () => { 
	const buttonLabelShow = 'show'
	const buttonLabelHide = 'hide'
	let component

	//Antes de cada test renderizo mi componente Togglable
	beforeEach(() => {
		component = render(
			<Togglable buttonLabelShow={buttonLabelShow} buttonLabelHide={buttonLabelHide}>
				<div className='testDiv'>testDivContent</div>
			</Togglable>
		)
	})

	test('renders its children', () => {

		//Con esto busco un texto dentro de el componente y si contiene ese texto guardo ese elemento
		component.getByText('testDivContent')

	})

	test('renders its children but they are not visible', () => {
		// //Espero que nuestro componente contenga una classname llamada testDiv
		// expect(component.container.querySelector('.testDiv')).toBeInTheDocument()

		//Con esto busco un texto dentro de el componente y si contiene ese texto guardo ese elemento
		const element = component.getByText('testDivContent')

		//Con esto estoy diciendo si el padre del children tiene el style display: none que sería este el padre <div style={hideWhenVisible}>
		expect(element.parentNode).toHaveStyle('display: none')
	})

	test('after clicking its children must be shown', () => {

		//Aquí cogemos el elemento botón gracias a su nombre
		const button = component.getByText(buttonLabelShow)

		//Clickeamos en el botón
		fireEvent.click(button)

		//Guardamos el hijo del botón, que es el div
		const element = component.getByText('testDivContent')

		//Le decimos que esperamos que no tenga un display none
		expect(element.parentNode).not.toHaveStyle("display: none")

	})

	test('Toggled content can be closed', () => {
        
		//Aquí cogemos el elemento botónShow gracias a su nombre
		const buttonShow = component.getByText(buttonLabelShow)

		//Clickeamos en el botón
		fireEvent.click(buttonShow)

		//Guardamos el hijo del botón, que es el div
		const element = component.getByText('testDivContent')

		//Le decimos que esperamos que se esté mostrando el contenido del toggable o que no tenga un display: none
		expect(element.parentNode).not.toHaveStyle("display: none")

		//Guardamos el botón cancel
		const cancelButton = component.getByText(buttonLabelHide)

		//Le hacemos click
		fireEvent.click(cancelButton)

		//Esperamos que el contenido no se esté mostrando o que el display del elemento padre sea none
		expect(element.parentNode).toHaveStyle("display: none")
	})
    
})



