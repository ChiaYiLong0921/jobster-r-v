import React, { useEffect } from 'react'
import { FormRow, FormRowSelect } from '../../components'
import Wrapper from '../../assets/wrappers/DashboardFormPage'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import {
  clearValues,
  createJob,
  handleChange,
  editJob,
} from '../../features/job/jobSlice'
import { Navigate, redirect, useNavigate } from 'react-router-dom'
import { isDebug } from '../../utils'

const AddJob = () => {
  const {
    isLoading,
    position,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    status,
    statusOptions,
    isEditing,
    editJobId,
  } = useSelector((store) => store.job)
  const { user } = useSelector((store) => store.user)
  if (isDebug()) {
    console.log(jobLocation)
  }

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!position || !company || !jobLocation) {
      toast.error('Please fill out all fields')
      return
    }
    if (isEditing) {
      dispatch(
        editJob({
          jobId: editJobId,
          job: { position, company, jobLocation, jobType, status },
        })
      )
      console.log('edited job')
      return navigate('/all-jobs')
    }
    dispatch(createJob({ position, company, jobLocation, jobType, status }))
  }

  const handleJobInput = (e) => {
    const name = e.target.name
    const value = e.target.value
    // console.log(`${name}:${value}`)

    dispatch(handleChange({ name, value }))
  }

  useEffect(() => {
    if (jobLocation === '') {
      dispatch(
        handleChange({
          name: 'jobLocation',
          value: user.location,
        })
      )
    }
  }, [])

  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? 'edit job' : 'add job'}</h3>
        <div className="form-center">
          <FormRow
            type="text"
            name="position"
            value={position}
            handleChange={handleJobInput}
          />
          <FormRow
            type="text"
            name="company"
            value={company}
            handleChange={handleJobInput}
          />
          <FormRow
            type="text"
            name="jobLocation"
            value={jobLocation}
            handleChange={handleJobInput}
            labelText="Job Location"
          />
          <FormRowSelect
            name="status"
            value={status}
            handleChange={handleJobInput}
            list={statusOptions}
          />
          <FormRowSelect
            name="jobType"
            value={jobType}
            handleChange={handleJobInput}
            list={jobTypeOptions}
            labelText="job type"
          />
          <div className="btn-container">
            <button
              type="button"
              className="btn btn-block clear-btn"
              onClick={() => dispatch(clearValues())}
            >
              clear
            </button>
            <button
              type="submit"
              className="btn btn-block submit-btn"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  )
}

export default AddJob
