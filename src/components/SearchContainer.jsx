import React, { useMemo, useState } from 'react'
import FormRow from './FormRow'
import FormRowSelect from './FormRowSelect'
import Wrapper from '../assets/wrappers/SearchContainer'
import { useDispatch, useSelector } from 'react-redux'
import { isDebug } from '../utils'
import { clearFilters, handleChange } from '../features/allJobs/allJobsSlice'

const SearchContainer = () => {
  const [localSearch, setLocalSearch] = useState('')

  const { isLoading, search, searchStatus, searchType, sort, sortOptions } =
    useSelector((store) => store.allJobs)
  const dispatch = useDispatch()
  const { jobTypeOptions, statusOptions } = useSelector((store) => store.job)

  const handleSearch = (e) => {
    dispatch(handleChange({ name: e.target.name, value: e.target.value }))
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    setLocalSearch('')
    dispatch(clearFilters())
  }
  const debounce = () => {
    console.log('debounce called')

    let timeoutID
    return (e) => {
      setLocalSearch(e.target.value)
      clearTimeout(timeoutID)
      timeoutID = setTimeout(() => {
        dispatch(handleChange({ name: e.target.name, value: e.target.value }))
      }, 1000)
    }
  }

  const optimizedDebounce = useMemo(() => debounce(), [])

  return (
    <Wrapper>
      <form className="form">
        <h4>search form</h4>
        <div className="form-center">
          {/* Search Position */}
          <FormRow
            type="text"
            name="search"
            value={localSearch}
            handleChange={optimizedDebounce}
          />
          {/* Search by status */}
          <FormRowSelect
            labelText="status"
            name="searchStatus"
            value={searchStatus}
            handleChange={handleSearch}
            list={['all', ...statusOptions]}
          />
          {/* Search by type */}
          <FormRowSelect
            labelText="type"
            name="searchType"
            value={searchType}
            handleChange={handleSearch}
            list={['all', ...jobTypeOptions]}
          />
          {/* Search by type */}
          <FormRowSelect
            name="sort"
            value={sort}
            handleChange={handleSearch}
            list={sortOptions}
          />
          <button
            className="btn btn-block btn-danger"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            clearFilters
          </button>
        </div>
      </form>
    </Wrapper>
  )
}

export default SearchContainer
