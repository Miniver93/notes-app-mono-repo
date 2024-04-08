/// <reference types="cypress" />

//Cypress usa la librería de Mocha y Mocha recomienda que no usemos funciones flecha, ya que estas pueden dar problemas

describe('Note App', function() { 
	beforeEach(function () {
		cy.request('POST', 'http://localhost:3001/api/testing/reset')

		const user = {
			username: 'Admin',
			name: 'Admin',
			password: '1234'
		}

		//Esto es similar a axios ya que está usando axios
		cy.request('POST', 'http://localhost:3001/api/users', user)

		cy.visit('http://127.0.0.1:5173')
	})

	it('frontpage can be opened', function() {
		cy.contains('Notes')
	});

	it('login form can be opened', function() {
		cy.contains('Show login').click()
	});

	it('user can log in', function() {
		cy.contains('Show login').click()
		cy.get('#username').type('Admin')
		cy.get('#password').type('1234')
		cy.get('[type="submit"]').click()
		cy.contains('button', 'New note')
	});

	it('user cannot be log in with wrong credentials', function() {
		cy.contains('Show login').click()
		cy.get('#username').type('IncorrectUser')
		cy.get('#password').type('000000')
		cy.get('[type="submit"]').click()
		cy.get('.errorMessage').should('contain', 'Wrong credentials')
	})

	describe('When logged in', function() {
		beforeEach(function() {
			//Aquí estoy llamando a un command de cypress que he creado en la carpeta support
			cy.login({username: 'Admin', password: '1234'})
		})
		it('a new note can be created', function() {
			cy.contains('button', 'New note').click()
			cy.get('#note_input').type('Nueva nota con cypress')
			cy.contains('button', 'Save').click()
			cy.get('#note_list li:last').should('contain', 'Nueva nota con cypress')
		});

		
		describe('and a note exists', function() {
			beforeEach(function() {
				//Commando para creación de notas
				cy.createNote({content: 'Nota para el funcionamiento del important', important: true})
			})
			it('note can be made important', function() {
				//$note sería el elemento del dom li seleccionado, la nota que estoy seleccionando, esto es jquery, es una referencia del elemento del dom que he seleccionado
				cy.get('#note_list')
					.contains('Nota para el funcionamiento del important').then(($note) =>{
											
						//Para debugar en cypress tengo que tener las herramientas de desarrollo abiertas y usar la función de cypress
						cy.debug()
						if($note.find('button').text().includes('Make important ⚠️')){
							cy.contains('button', 'Make important ⚠️')
								.click()
							cy.contains('button', 'Make not important 🚫')

						}else{
							cy.contains('button', 'Make not important 🚫')
								.click()
							cy.contains('button', 'Make important ⚠️')
						}
					})

			})
		})

	})

})