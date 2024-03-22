import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3003/api'

const login = async credentials => {
  const response = await axios.post(('/login'), credentials)
  return response.data
}

export default { login }