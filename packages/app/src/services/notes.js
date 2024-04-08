import axios from 'axios'
const baseUrl = '/api/notes'


let token = null

//Guardamos el token del usuario que lo conseguimos al loguearnos
const setToken = newToken =>{
	token = `Bearer ${newToken}`
}

const setConfig = async () =>{
	//Decimos que nuestra request tenga una configuración, la cual es mandar el header Authorization
	const config = {
		headers:  {
			Authorization: token //Agregamos el token del usuario logueado para darle authorization
		}
	}
	return config
}


//Recibir todas las notas
const getAll = async () => {
	const {data} = await axios.get(baseUrl)
	return data
}

//Crear una nueva nota
const create = async (newObject) => {
	const {data} = await axios.post(baseUrl, newObject, await setConfig())
	return data
}

//Actualizar una nota
const update = async (id, newObject) => {
	const {data} = await axios.put(`${baseUrl}/${id}`, newObject, await setConfig())
	return data
}

export default { 
	getAll, 
	create, 
	update,
	setToken
}