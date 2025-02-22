import { toast } from 'react-toastify'
import { checkForUnauthorizedResponse } from './axios'

export const isDebug = () => {
  const isDebugging = false
  return isDebugging
}

export const addUserToLocalStorage = (user) => {
  localStorage.setItem('user', JSON.stringify(user))
}

export const removeUserFromLocalStorage = () => {
  localStorage.removeItem('user')
}

export const getUserFromLocalStorage = () => {
  const result = localStorage.getItem('user')
  //   console.log(`Unparse: ${result}`)
  //   console.log(`Parse: ${JSON.parse(result)}`)

  const user = result ? JSON.parse(result) : null
  return user
}
export const checkForErrors = (error, thunkAPI) => {
  if (isDebug()) {
    console.log(`check for errors: ${error}`)
  }
  if (error.code === 'ERR_NETWORK') {
    toast.error('server connection error')
    return thunkAPI.rejectWithValue('server connection error')
  }
  return checkForUnauthorizedResponse(error, thunkAPI)
}

export { default as customFetch } from './axios'
