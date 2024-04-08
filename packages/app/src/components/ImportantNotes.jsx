/* eslint-disable react/prop-types */
import React from "react";

const ImportantNotes = ({ notes, showAll }) => {

	//Si showAll es true, noteToShow obtiene el valor de notes directamente, lo que significa que todas las notas se mostrarán. Si showAll es flase se ejecutará un filtro que me devuelve solo las notas que tengan como valor true
	const noteToShow = showAll ? notes : notes.filter((note) => note.important);
	return (
		<div>
			<h2>Important notes</h2>
			<ul id="important_notes">
				{noteToShow.map((note) => (
					<li className="note" key={"I".concat(note.id)}>
						{note.content}
					</li>
				))}
			</ul>
		</div>
	);
};

export default ImportantNotes;