import React from 'react'
import useAuth from '../hooks/useAuth'
import { Navigate } from 'react-router'

function AdminProtectedRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) {
    return <div>Loading...</div>
  }
  if (!user) {
    return <Navigate to="/login" />
  }
  if (user.role !== 'admin') {
    return <Navigate to="/tasks" />
  }
  return children
}

export default AdminProtectedRoute
