import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

// dummy auth — replace with actual logic
const isAuthenticated = () => {
  return localStorage.getItem('authToken') !== null
}

interface ProtectedRouteProps {
  children: ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

export default ProtectedRoute