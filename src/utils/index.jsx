import { toast } from 'react-toastify'
import { clearStore } from '../features/user/userSlice'

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
    console.log(`check for errors:`)
    console.log(error)
  }
  if (error.code === 'ERR_NETWORK') {
    return thunkAPI.rejectWithValue('server connection error')
  }

  if (error.response.status === 401) {
    const message = error.response.data.msg

    if (isDebug()) {
      console.log('checkForUnauthorizedError: ', message)
    }
    thunkAPI.dispatch(clearStore())
    return thunkAPI.rejectWithValue(message)
  }
  if (isDebug()) {
    console.log('checkForNonAuthorizedError: ')
    console.log(error)
  }
  return thunkAPI.rejectWithValue(error.response.data.msg)
}

export { default as customFetch } from './axios'
