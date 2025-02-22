import { checkForErrors, customFetch } from '../../utils'
import authHeader from '../../utils/authHeader'
import { getAllJobs, hideLoading, showLoading } from '../allJobs/allJobsSlice'
import { logoutUser } from '../user/userSlice'
import { clearValues } from './jobSlice'

export const createJobThunk = async (jobSlice, thunkAPI) => {
  try {
    const resp = customFetch.post('/jobs', jobSlice)
    thunkAPI.dispatch(clearValues())
    return resp.data
  } catch (error) {
    return checkForErrors(error, thunkAPI)
  }
}
export const deleteJobThunk = async (jobId, thunkAPI) => {
  thunkAPI.dispatch(showLoading())
  try {
    const resp = await customFetch.delete(`/jobs/${jobId}`)
    thunkAPI.dispatch(getAllJobs())
    return resp.data.msg
  } catch (error) {
    thunkAPI.dispatch(hideLoading())
    return checkForErrors(error, thunkAPI)
  }
}
export const editJobThunk = async ({ jobId, job }, thunkAPI) => {
  try {
    const resp = await customFetch.patch(`/jobs/${jobId}`, job)
    thunkAPI.dispatch(clearValues())
    return resp.data
  } catch (error) {
    return checkForErrors(error, thunkAPI)
  }
}
