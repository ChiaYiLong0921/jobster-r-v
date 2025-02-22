import axios from 'axios'
import { getUserFromLocalStorage, isDebug } from '.'
import { clearStore } from '../features/user/userSlice'

const local_api = '//localhost:5000/api/v1'
const render_url = 'https://temp-jobster-api-dc9e.onrender.com/api/v1'

const customFetch = axios.create({
  // baseURL: local_api,
  baseURL: render_url,
})

customFetch.interceptors.request.use((config) => {
  const user = getUserFromLocalStorage()
  if (isDebug()) {
    console.log(user)
  }

  if (user) {
    config.headers['Authorization'] = `Bearer ${user.token}`
  }
  return config
})

export const checkForUnauthorizedResponse = (error, thunkAPI) => {
  if (error.response.status === 401) {
    thunkAPI.dispatch(clearStore())
    return thunkAPI.rejectWithValue('Unauthorized! Logging Out...')
  }
  return thunkAPI.rejectWithValue(error.response.data.msg)
}

export default customFetch
