import React from "react";
import '@testing-library/jest-dom'
import { fireEvent, render } from "@testing-library/react";
import Note from "./Note";
import { test, jest, expect } from "@jest/globals";

test('renders content', () => { 
	const note = {
		content: 'This is a test',
		important: true
	}

	const component = render(<Note note={note} />)

	component.getByText('This is a test')
	component.getByText('Make not important 🚫')
})

test('clicking the button calls event handler once', () => { 
	const note = {
		content: 'This is a test',
		important: true
	}

	//Un mock sirve para hacerse pasar por algo, en este caso se hace pasar por el handle toggleImportance, esto servirá para saber cuantas veces se ha llamado está función
	const mockHandler = jest.fn()

	//Renderizamos el componente Note
	const component = render(<Note note={note} toggleImportance={mockHandler}/>)

	//Del componente recuperamos el botón
	const button = component.getByText('Make not important 🚫')

	//FireEvent es para disparar un evento, en este caso de tipo click
	fireEvent.click(button)

	// //Esto hace que esperemos que mockHandler sea llamado almenos 1 vez
	// expect(mockHandler.mock.calls).toHaveLength(1)

	//También se puede hacer así, siendo esta una forma más legible. Esto me indica cuantas veces se ha llamado el mock
	expect(mockHandler).toHaveBeenCalledTimes(1)
})