import axios from 'axios'
import { getUserFromLocalStorage, isDebug } from '.'
import { clearStore } from '../features/user/userSlice'

const backend_url = import.meta.env.VITE_BACKEND_URL


const customFetch = axios.create({
  baseURL: backend_url,
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
