/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */

import React, {useRef, useState} from "react"
import noteService from '../services/notes'
import Togglable from "./Togglable"

const NewNoteForm = ({notes, setNotes}) => {
	const [newNote, setNewNote] = useState('')
	const toggableRef = useRef()

	const handleChange = (event) => {
		setNewNote(event.target.value)
	}

	const handleAddNote = async (event) => {
		event.preventDefault();
		//Creación del objeto nueva nota

		const noteObject = {
			content: newNote,
			important: Math.random() < 0.5, //Su importancia será aleatoria
		};

		//Agregar al estado de las notas la nueva nota solo si se resuelve la promesa
		await noteService.create(noteObject);
		setNotes(
			notes.concat(noteObject)
		); /* Concatenamos nuestro nuevo objeto nota con nuestros objetos notas */
		setNewNote(''); //Para borrar lo que contiene el input después de guardar la nota
		
		//Aquí accedemos al método que cambia la visibilidad de nuestros botones 
		toggableRef.current.toggleVisibility()
	};

	return (
		<Togglable buttonLabelShow={'New note'} buttonLabelHide={'Cancel'} ref={toggableRef}>
			<h3>Create a new note</h3>
			<form id="new_note_form" onSubmit={handleAddNote}>{/* Le estoy añadiendo el preventDefault al formulario y la nota*/}
				<input type="text" name="newNote" id="note_input" placeholder='Place your new note' value={newNote} onChange={handleChange}/>{/* Le estoy agregando como valor el estado inicial A new note, cuando este valor cambia por otro, con el evento onchange, se guarda ese valor en el stado setNewNote */}
				<button type="submit">Save</button>
			</form>
		</Togglable>
	)
}



export default NewNoteForm