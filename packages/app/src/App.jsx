/* eslint-disable react/prop-types */
import React from "react";
import { useState, useEffect } from "react";
import ImportantNotes from "./components/ImportantNotes";
import ErrorMessage from "./components/ErrorMessage";
import LoginForm from "./components/LoginForm";
import NewNoteForm from "./components/NewNoteForm";
import noteService from "./services/notes";
import NoteList from "./components/NoteList";


const App = () => {
	//Inicializo el estado 'notes' con el valor inicial proporcionado el las props.notes, que es el objeto notes del main.jsx
	const [notes, setNotes] = useState([]);
	const [showAll, setShowAll] = useState(true);
	const [errorMessage, setErrorMessage] = useState("");
	const [user, setUser] = useState(null);


	useEffect(() => {
		noteService.getAll().then((initialNotes) => {
			setNotes(initialNotes);
		});
	}, []);


	return (
		<div>
			<h1>Notes</h1>
			<ErrorMessage message={errorMessage} />

			<LoginForm setErrorMessage={setErrorMessage} setUser={setUser} user={user}/>

			<NoteList  notes={notes} setShowAll={setShowAll} showAll={showAll} setNotes={setNotes}/>

			
			{user &&<NewNoteForm notes={notes} setNotes={setNotes}/>}
			
			
			<ImportantNotes notes={notes} showAll={showAll}/>
		</div>
	);
};

export default App;