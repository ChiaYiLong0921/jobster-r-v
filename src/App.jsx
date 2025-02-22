import { useState } from 'react'
import { Landing, Error, Register, ProtectedRoute } from './pages'
import styled from 'styled-components'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {
  Profile,
  SharedLayout,
  Stats,
  AddJob,
  AllJobs,
} from './pages/dashboard'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <SharedLayout />
      </ProtectedRoute>
    ),
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Stats />,
      },
      {
        path: 'all-jobs',
        element: <AllJobs />,
      },
      {
        path: 'add-job',
        element: <AddJob />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
    ],
  },
  {
    path: '/landing',
    element: <Landing />,
    errorElement: <Error />,
  },
  {
    path: '/register',
    element: <Register />,
    errorElement: <Error />,
  },
])

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
