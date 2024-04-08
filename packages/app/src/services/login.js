import axios from "axios";

const baseurl = '/api/login'

const login = async (credentials) =>{
	const {data} = await axios.post(baseurl, credentials)
	return data
}

export default {
	login
}