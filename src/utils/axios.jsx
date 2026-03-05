import axios from 'axios'
import { getUserFromLocalStorage, isDebug } from '.'
import { clearStore } from '../features/user/userSlice'

const api_url = import.meta.env.VITE_API_URL
// const backend_url = 'https://stalked-hypergenetical-ivory.ngrok-free.dev/api/v1'


const customFetch = axios.create({
  baseURL: api_url,
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

export default customFetch
