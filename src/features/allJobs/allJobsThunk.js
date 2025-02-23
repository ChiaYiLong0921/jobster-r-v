import { checkForErrors, customFetch, isDebug } from '../../utils'

export const getAllJobsThunk = async (__, thunkAPI) => {
  const { page, search, searchStatus, searchType, sort } =
    thunkAPI.getState().allJobs
  let url = `/jobs?status=${searchStatus}&jobType=${searchType}&sort=${sort}&page=${page}`
  if (search) {
    url = url + `&search=${search}`
  }

  try {
    const resp = await customFetch.get(url)

    if (isDebug()) {
      console.log(resp.data)
    }

    return resp.data
  } catch (error) {
    return checkForErrors(error, thunkAPI)
  }
}

export const showStatsThunk = async (_, thunkAPI) => {
  try {
    const resp = await customFetch.get('/jobs/stats')
    if (isDebug()) {
      console.log(resp.data)
    }
    return resp.data
  } catch (error) {
    return checkForErrors(error, thunkAPI)
  }
}
