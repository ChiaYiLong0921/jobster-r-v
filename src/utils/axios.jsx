import axios from 'axios'
import { getUserFromLocalStorage, isDebug } from '.'
import { clearStore } from '../features/user/userSlice'

const local_api = '//localhost:8080/api/v1'
const cloud_run = import.meta.env.BACKEND_URL

const customFetch = axios.create({
  // baseURL: local_api,
  baseURL: cloud_run,
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
