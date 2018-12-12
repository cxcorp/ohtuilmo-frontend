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

export default { create }
