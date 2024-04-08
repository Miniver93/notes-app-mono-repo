/* eslint-disable react/prop-types */
import React from "react";
import Note from "./Note";

const NoteList = ({ notes, showAll, setShowAll, setNotes }) => {

	// Esta función se encarga de cambiar el estado de la propiedad 'important' de una nota específica.
	const handleToggleImportant = (note) => {
		// Creamos un nuevo array de notas basado en el estado actual.
		const toggledNotes = notes.map((n) => {
			// Si la ID de la nota actual coincide con la ID de la nota pasada como argumento, actualizamos su propiedad 'important'.
			if (n.id === note.id) {
				// Utilizamos la sintaxis de spread (...) para crear una copia de la nota actual y sobrescribimos el valor de 'important' con su inverso.
				return { ...n, important: !n.important };
			}
			// Si la ID de la nota no coincide, mantenemos la nota sin cambios.
			return n;
		});
	
		// Finalmente, actualizamos el estado de 'notes' con el nuevo array de notas modificado.
		setNotes(toggledNotes);
	};


	return (
		<div>
			<button onClick={() => setShowAll(!showAll)}>
        Show {showAll ? "important ⚠️" : "all 🧾"}
			</button>

			<ul id="note_list">
				{notes.map((note) => (
					<Note
						toggleImportance={handleToggleImportant}
						key={"N".concat(note.id)}
						note={note}
					/>
				))}
			</ul>
		</div>
	);
};

export default NoteList;