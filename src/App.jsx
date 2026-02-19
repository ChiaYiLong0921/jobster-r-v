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
  // --- force https redirect ---
  if (window.location.protocol === 'http:' && window.location.hostname !== 'localhost') {
      // replacing http with https
      window.location.replace(window.location.href.replace(/^http:/, 'https:'));
  }

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
