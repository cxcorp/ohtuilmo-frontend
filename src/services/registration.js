import axios from 'axios'
import { BACKEND_URI } from '../utils/config'
import { getUserToken } from '../utils/functions'

const url = `${BACKEND_URI}/api/registrations`

const create = async ({ questions, preferred_topics }) => {
  const response = await axios.post(
    url,
    { questions, preferred_topics },
    { headers: { Authorization: 'Bearer ' + getUserToken() } }
  )
  return response.data.registration
}

const getAll = async () => {
  const config = {
    headers: { 'Authorization': 'bearer ' + getUserToken() }
  }
  const response = await axios.get(url, config)
  return response.data.registrations
}

export default { create, getAll }
