// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', ({username, password}) => { 
	cy.request('POST', 'http://localhost:3001/api/login', {username, password})
		.then((response) => {
			//Nos devuelve una respuesta con la información del usuario, entonces esta información la guardamos en el localStorage
			localStorage.setItem(
				'loggedNoteAppUser', JSON.stringify(response.body)
			)
		})
	//Una vez que guardamos el token tenemos que visitar la web para que se renderice los componentes, ya que no estamos accediendo a la web si no a la api
	cy.visit('http://127.0.0.1:5173')

})

Cypress.Commands.add('createNote', ({content, important}) =>{
	cy.request({
		method: 'POST',
		url: 'http://localhost:3001/api/notes',
		body: { content, important},
		headers: {
			Authorization: `Bearer ${JSON.parse(localStorage.getItem('loggedNoteAppUser')).token}`
		}
	})

	cy.visit('http://127.0.0.1:5173')
})